import { Request, Response } from 'express';
import bankRepository from '../repositories/bank_repository';

class BankController {
  async getAllBanks(req: Request, res: Response) {
    try {
      const result = await bankRepository.getAllBanks();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getBankById(req: Request, res: Response) {
    const bankId = parseInt(req.params.id);
    try {
      const result = await bankRepository.getBankById(bankId);
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('Bank not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createBank(req: Request, res: Response) {
    const { walletId, name, bankCode, bankAccount, type } = req.body;
    try {
      await bankRepository.createBank(walletId, name, bankCode, bankAccount, type);
      res.send('Bank created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateBank(req: Request, res: Response) {
    const bankId = parseInt(req.params.id);
    const { walletId, name, bankCode, bankAccount, type } = req.body;
    try {
      await bankRepository.updateBank(bankId, walletId, name, bankCode, bankAccount, type);
      res.send('Bank updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteBank(req: Request, res: Response) {
    const bankId = parseInt(req.params.id);
    try {
      await bankRepository.deleteBank(bankId);
      res.send('Bank deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new BankController();
