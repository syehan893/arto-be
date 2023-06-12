import { Request, Response } from 'express';
import { decodeToken } from '../common/token';
import transactionRepository from '../repositories/transaction_repository';
import userRepository from '../repositories/user_repository';
import walletRepository from '../repositories/wallet_repository';
import historyRepository from '../repositories/history_repository';

class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await transactionRepository.getTransactionByEmail(req.params.email);
        res.send({ 'response': result.rows });
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getAllTransactionsByType(req: Request, res: Response) {
    const request = req.params.email;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await transactionRepository.getTransactionByType(request);
        res.send({ 'response': result.rows });
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send(`Internal Server Error ${err}`);
    }
  }

  async approveRejectRequestPayment(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const { trxId, emailReceiver, nominal, isApprove } = transactionData;
      if (decodeToken(req.headers.authorization || '')) {
        const sender = await userRepository.getUserByEmail(emailReceiver);
        if (isApprove) {
          const balanceReceiver = parseInt(sender.rows[0]['balance']) - parseInt(nominal);
          await walletRepository.updateBalanceWallet(sender.rows[0]['wallet_id'], balanceReceiver);

          const transactionParam = {
            'status': 'APPROVED',
            'edited_by': emailReceiver,
            'edited_at': 'now()',
          };
          const transaction = await transactionRepository.updateTransactionByEmailReceiver(trxId, transactionParam);

          const historySenderParam = {
            'id': Math.floor((Math.random() * 10000000) + 1),
            'transaction_id': transaction.rows[0].id,
            'name': `Request Payment Approved`,
            'status': true,
            'type': 'Request Payment',
            'created_by': emailReceiver,
            'created_at': 'now()',
            'edited_by': emailReceiver,
            'edited_at': 'now()',
          }
          await historyRepository.createHistory(historySenderParam);

          res.status(200).send(`Request Payment Approved ${transaction.rows[0].id}`);
        } else {

          const transactionParam = {
            'status': 'REJECTED',
            'edited_by': emailReceiver,
            'edited_at': 'now()',
          };
          const transaction = await transactionRepository.updateTransactionByEmailReceiver(trxId, transactionParam);

          const historySenderParam = {
            'id': Math.floor((Math.random() * 10000000) + 1),
            'transaction_id': transaction.rows[0].id,
            'name': `Request Payment Rejected`,
            'status': false,
            'type': 'Request Payment',
            'created_by': emailReceiver,
            'created_at': 'now()',
            'edited_by': emailReceiver,
            'edited_at': 'now()',
          }
          await historyRepository.createHistory(historySenderParam);

          res.status(200).send(`Request Payment Rejected ${transaction.rows[0].id}`);
        }

      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error ${error}`);
    }
  }

  async requestPayment(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const { emailSender, nominal, noRek } = transactionData;
      if (decodeToken(req.headers.authorization || '')) {
        const sender = await userRepository.getUserByEmail(emailSender);

        const transactionParam = {
          'wallet_id': sender.rows[0]['wallet_id'],
          'nominal': nominal,
          'bank_account': noRek,
          'email_receiver': emailSender,
          'status': 'WAITING_APPROVAL',
          'type': 'REQUEST_PAYMENT',
          'detail': `Transfer Ke Rekening ${sender.rows[0]['name']}`,
          'created_by': emailSender,
          'created_at': 'now()',
          'edited_by': emailSender,
          'edited_at': 'now()',
        };
        await transactionRepository.createTransaction(transactionParam);
        res.status(200).send('Request Payment Created');
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error ${error}`);
    }
  }


  async topUp(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const { emailSender, detail, nominal, phoneNumber, ewallet } = transactionData;
      if (decodeToken(req.headers.authorization || '')) {
        const sender = await userRepository.getUserByEmail(emailSender);

        const balanceSender = parseInt(sender.rows[0]['balance']) - parseInt(nominal);
        await walletRepository.updateBalanceWallet(sender.rows[0]['wallet_id'], balanceSender);

        const transactionParam = {
          'wallet_id': sender.rows[0]['wallet_id'],
          'nominal': nominal,
          'bank_account': phoneNumber,
          'email_receiver': emailSender,
          'status': 'COMPLETED',
          'type': 'TOPUP',
          'detail': detail,
          'created_by': emailSender,
          'created_at': 'now()',
          'edited_by': emailSender,
          'edited_at': 'now()',
        };
        const transaction = await transactionRepository.createTransaction(transactionParam);

        const historySenderParam = {
          'id': Math.floor((Math.random() * 10000000) + 1),
          'transaction_id': transaction.rows[0].id,
          'name': `Top Up ${ewallet} - ${phoneNumber}`,
          'status': true,
          'type': 'Top Up',
          'created_by': emailSender,
          'created_at': 'now()',
          'edited_by': emailSender,
          'edited_at': 'now()',
        }
        await historyRepository.createHistory(historySenderParam);

        res.status(200).send(`Top Up Success ${transaction.rows[0].id}`);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error ${error}`);
    }
  }

  async transfer(req: Request, res: Response) {
    try {
      const transactionData = req.body;
      const { emailSender, emailReceiver, detail, nominal, noRek } = transactionData;
      if (decodeToken(req.headers.authorization || '')) {
        const sender = await userRepository.getUserByEmail(emailSender);
        const receiver = await userRepository.getUserByEmail(emailReceiver);
        if (noRek !== receiver.rows[0]['card_number']) {
          console.log('error no rek ga sama');
          res.status(500).send('Internal Server Error');
        }
        if (sender.rows[0]['balance'] < nominal) {
          console.log('error saldo kurang');
          res.status(500).send('Internal Server Error');
        }

        const balanceReceiver = parseInt(receiver.rows[0]['balance']) + parseInt(nominal);
        await walletRepository.updateBalanceWallet(receiver.rows[0]['wallet_id'], balanceReceiver);

        const balanceSender = parseInt(sender.rows[0]['balance']) - parseInt(nominal);
        await walletRepository.updateBalanceWallet(sender.rows[0]['wallet_id'], balanceSender);

        const transactionParam = {
          'wallet_id': sender.rows[0]['wallet_id'],
          'nominal': nominal,
          'bank_account': noRek,
          'email_receiver': emailReceiver,
          'status': 'COMPLETED',
          'type': 'TRANSFER',
          'detail': detail,
          'created_by': emailSender,
          'created_at': 'now()',
          'edited_by': emailSender,
          'edited_at': 'now()',
        };
        const transaction = await transactionRepository.createTransaction(transactionParam);

        const historySenderParam = {
          'id': Math.floor((Math.random() * 10000000) + 1),
          'transaction_id': transaction.rows[0].id,
          'name': `Transfer ke Rekening ${receiver.rows[0]['name']}`,
          'status': true,
          'type': 'Transfer Keluar',
          'created_by': emailSender,
          'created_at': 'now()',
          'edited_by': emailSender,
          'edited_at': 'now()',
        }
        await historyRepository.createHistory(historySenderParam);

        const historyReceiverParam = {
          'id': Math.floor((Math.random() * 10000000) + 1),
          'transaction_id': transaction.rows[0].id,
          'name': `Transfer dari Rekening ${sender.rows[0]['name']}`,
          'status': true,
          'type': 'Transfer Keluar',
          'created_by': emailReceiver,
          'created_at': 'now()',
          'edited_by': emailReceiver,
          'edited_at': 'now()',
        }
        await historyRepository.createHistory(historyReceiverParam);

        res.status(200).send(`Transfer Success ${transaction.rows[0].id}`);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error ${error}`);
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await transactionRepository.getTransactionById(id);
        if (result.rowCount > 0) {
          res.send(result.rows[0]);
        } else {
          res.status(404).send('Transaction not found');
        }
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createTransaction(req: Request, res: Response) {
    const transactionData = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await transactionRepository.createTransaction(transactionData);
        res.send('Transaction created successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const transactionData = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await transactionRepository.updateTransaction(id, transactionData);
        res.send('Transaction updated successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await transactionRepository.deleteTransaction(id);
        res.send('Transaction deleted successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new TransactionController();
