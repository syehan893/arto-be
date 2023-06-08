import { Request, Response } from 'express';
import walletRepository from '../repositories/wallet_repository';

class WalletController {
  async getAllWallets(req: Request, res: Response) {
    try {
      const result = await walletRepository.getAllWallets();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getWalletById(req: Request, res: Response) {
    const walletId = parseInt(req.params.id);
    try {
      const result = await walletRepository.getWalletById(walletId);
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('Wallet not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createWallet(req: Request, res: Response) {
    const { userId, balance, bank, card } = req.body;
    try {
      await walletRepository.createWallet(userId, balance, bank, card);
      res.send('Wallet created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateWallet(req: Request, res: Response) {
    const walletId = parseInt(req.params.id);
    const { userId, balance, bank, card } = req.body;
    try {
      await walletRepository.updateWallet(walletId, userId, balance, bank, card);
      res.send('Wallet updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteWallet(req: Request, res: Response) {
    const walletId = parseInt(req.params.id);
    try {
      await walletRepository.deleteWallet(walletId);
      res.send('Wallet deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new WalletController();
