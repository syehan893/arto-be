import { Request, Response } from 'express';
import { decodeToken } from '../common/token';
import bankRepository from '../repositories/bank_repository';

class BankController {
  async getAllBanks(req: Request, res: Response) {
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await bankRepository.getAllBanks();
        res.send(result.rows);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getBankById(req: Request, res: Response) {
    const bankId = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await bankRepository.getBankById(bankId);
        if (result.rowCount > 0) {
          res.send(result.rows[0]);
        } else {
          res.status(404).send('Bank not found');
        }
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createBank(req: Request, res: Response) {
    const { walletId, name, bankCode, bankAccount, type } = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await bankRepository.createBank(walletId, name, bankCode, bankAccount, type);
        res.send('Bank created successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateBank(req: Request, res: Response) {
    const bankId = parseInt(req.params.id);
    const { walletId, name, bankCode, bankAccount, type } = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await bankRepository.updateBank(bankId, walletId, name, bankCode, bankAccount, type);
        res.send('Bank updated successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteBank(req: Request, res: Response) {
    const bankId = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await bankRepository.deleteBank(bankId);
        res.send('Bank deleted successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new BankController();
