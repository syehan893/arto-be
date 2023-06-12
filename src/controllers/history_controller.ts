import { Request, Response } from 'express';
import { decodeToken } from '../common/token';
import historyRepository from '../repositories/history_repository';

class HistoryController {
  async getAllHistories(req: Request, res: Response) {
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await historyRepository.getHistoryByEmail(req.params.email);
        res.send(result.rows);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getHistoryById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await historyRepository.getHistoryById(id);
        if (result.rowCount > 0) {
          res.send(result.rows[0]);
        } else {
          res.status(404).send('History not found');
        }
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createHistory(req: Request, res: Response) {
    const historyData = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await historyRepository.createHistory(historyData);
        res.send(result.rows);
      } else {
        res.status(401).send('Unauthorized');
      }
      await historyRepository.createHistory(historyData);
      res.send('History created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateHistory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const historyData = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await historyRepository.updateHistory(id, historyData);
        res.send('History updated successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteHistory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await historyRepository.deleteHistory(id);
        res.send('History deleted successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new HistoryController();
