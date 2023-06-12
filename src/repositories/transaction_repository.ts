import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class TransactionRepository {
  async getAllTransactions(): Promise<QueryResult> {
    const query = 'SELECT * FROM transaction';
    return await pool.query(query);
  }

  async getTransactionById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM transaction WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async getTransactionByEmail(email: string): Promise<QueryResult> {
    const query = 'SELECT * FROM transaction WHERE created_by = $1';
    return await pool.query(query, [email]);
  }

  async getTransactionByType(email: string): Promise<QueryResult> {
    const query = 'SELECT * FROM transaction WHERE type = $1 AND status = $2 AND created_by = $3';
    return await pool.query(query, ['REQUEST_PAYMENT', 'WAITING_APPROVAL', email]);
  }

  async createTransaction(transactionData: any): Promise<QueryResult> {
    const { wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at, type } = transactionData;
    const query = 'INSERT INTO transaction (wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
    return await pool.query(query, [wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at, type]);
  }

  async updateTransaction(id: number, transactionData: any): Promise<QueryResult> {
    const { wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at } = transactionData;
    const query = 'UPDATE transaction SET wallet_id = $1, nominal = $2, bank_account = $3, email_receiver = $4, status = $5, detail = $6, created_by = $7, created_at = $8, edited_by = $9, edited_at = $10 WHERE id = $11';
    return await pool.query(query, [wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at, id]);
  }

  async updateTransactionByEmailReceiver(trxId: string, transactionData: any): Promise<QueryResult> {
    const { status, edited_by, edited_at } = transactionData;
    const query = 'UPDATE transaction SET status = $1, edited_by = $2, edited_at = $3 WHERE id = $4 RETURNING id';
    return await pool.query(query, [status, edited_by, edited_at, trxId]);
  }

  async deleteTransaction(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM transaction WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new TransactionRepository();
