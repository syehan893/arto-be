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

  async createTransaction(transactionData: any): Promise<QueryResult> {
    const { wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at } = transactionData;
    const query = 'INSERT INTO transaction (wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
    return await pool.query(query, [wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at]);
  }

  async updateTransaction(id: number, transactionData: any): Promise<QueryResult> {
    const { wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at } = transactionData;
    const query = 'UPDATE transaction SET wallet_id = $1, nominal = $2, bank_account = $3, email_receiver = $4, status = $5, detail = $6, created_by = $7, created_at = $8, edited_by = $9, edited_at = $10 WHERE id = $11';
    return await pool.query(query, [wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at, id]);
  }

  async deleteTransaction(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM transaction WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new TransactionRepository();
