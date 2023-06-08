import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class RequestPaymentRepository {
  async getAllRequestPayments(): Promise<QueryResult> {
    const query = 'SELECT * FROM request_payment';
    return await pool.query(query);
  }

  async getRequestPaymentById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM request_payment WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async createRequestPayment(requestPaymentData: any): Promise<QueryResult> {
    const { transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at } = requestPaymentData;
    const query = 'INSERT INTO request_payment (transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    return await pool.query(query, [transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at]);
  }

  async updateRequestPayment(id: number, requestPaymentData: any): Promise<QueryResult> {
    const { transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at } = requestPaymentData;
    const query = 'UPDATE request_payment SET transaction_id = $1, name = $2, type = $3, action = $4, status = $5, created_by = $6, created_at = $7, edited_by = $8, edited_at = $9 WHERE id = $10';
    return await pool.query(query, [transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at, id]);
  }

  async deleteRequestPayment(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM request_payment WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new RequestPaymentRepository();
