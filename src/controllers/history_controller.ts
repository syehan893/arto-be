import { Request, Response } from 'express';
import historyRepository from '../repositories/history_repository';

class HistoryController {
  async getAllHistories(req: Request, res: Response) {
    try {
      const result = await historyRepository.getAllHistories();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getHistoryById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const result = await historyRepository.getHistoryById(id);
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('History not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createHistory(req: Request, res: Response) {
    const historyData = req.body;
    try {
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
      await historyRepository.updateHistory(id, historyData);
      res.send('History updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteHistory(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await historyRepository.deleteHistory(id);
      res.send('History deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new HistoryController();
