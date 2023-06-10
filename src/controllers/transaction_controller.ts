import { Request, Response } from 'express';
import { decodeToken } from '../common/token';
import transactionRepository from '../repositories/transaction_repository';

class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await transactionRepository.getAllTransactions();
        res.send(result.rows);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
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
