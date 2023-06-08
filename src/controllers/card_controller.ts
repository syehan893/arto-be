import { Request, Response } from 'express';
import cardRepository from '../repositories/card_repository';

class CardController {
  async getAllCards(req: Request, res: Response) {
    try {
      const result = await cardRepository.getAllCards();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getCardById(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    try {
      const result = await cardRepository.getCardById(cardId);
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('Card not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createCard(req: Request, res: Response) {
    const { walletId, name, cardType, cardNumber, type } = req.body;
    try {
      await cardRepository.createCard(walletId, name, cardType, cardNumber, type);
      res.send('Card created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    const { walletId, name, cardType, cardNumber, type } = req.body;
    try {
      await cardRepository.updateCard(cardId, walletId, name, cardType, cardNumber, type);
      res.send('Card updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteCard(req: Request, res: Response) {
    const cardId = parseInt(req.params.id);
    try {
      await cardRepository.deleteCard(cardId);
      res.send('Card deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new CardController();
