import { Request, Response } from 'express';
import requestPaymentRepository from '../repositories/request_payment_repository';

class RequestPaymentController {
  async getAllRequestPayments(req: Request, res: Response) {
    try {
      const result = await requestPaymentRepository.getAllRequestPayments();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getRequestPaymentById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const result = await requestPaymentRepository.getRequestPaymentById(id);
      if (result.rowCount > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('Request Payment not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createRequestPayment(req: Request, res: Response) {
    const requestPaymentData = req.body;
    try {
      await requestPaymentRepository.createRequestPayment(requestPaymentData);
      res.send('Request Payment created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateRequestPayment(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const requestPaymentData = req.body;
    try {
      await requestPaymentRepository.updateRequestPayment(id, requestPaymentData);
      res.send('Request Payment updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteRequestPayment(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await requestPaymentRepository.deleteRequestPayment(id);
      res.send('Request Payment deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new RequestPaymentController();
