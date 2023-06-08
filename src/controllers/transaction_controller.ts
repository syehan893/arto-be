import { Request, Response } from 'express';
import transactionRepository from '../repositories/transaction_repository';

class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const result = await transactionRepository.getAllTransactions();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getTransactionById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const result = await transactionRepository.getTransactionById(id);
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('Transaction not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createTransaction(req: Request, res: Response) {
    const transactionData = req.body;
    try {
      await transactionRepository.createTransaction(transactionData);
      res.send('Transaction created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateTransaction(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const transactionData = req.body;
    try {
      await transactionRepository.updateTransaction(id, transactionData);
      res.send('Transaction updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await transactionRepository.deleteTransaction(id);
      res.send('Transaction deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new TransactionController();
