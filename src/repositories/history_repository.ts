import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class HistoryRepository {
  async getAllHistories(): Promise<QueryResult> {
    const query = 'SELECT * FROM history';
    return await pool.query(query);
  }

  async getHistoryById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM history WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async getHistoryByEmail(email: string): Promise<QueryResult> {
    const query = 'SELECT * FROM history WHERE created_by = $1';
    return await pool.query(query, [email]);
  }

  async createHistory(historyData: any): Promise<QueryResult> {
    const { id, transaction_id, name, status, type, created_by, created_at, edited_by, edited_at } = historyData;
    const query = 'INSERT INTO history (id, transaction_id, name, status, type, created_by, created_at, edited_by, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
    return await pool.query(query, [id, transaction_id, name, status, type, created_by, created_at, edited_by, edited_at]);
  }

  async updateHistory(id: number, historyData: any): Promise<QueryResult> {
    const { transaction_id, name, status, type, created_by, created_at, edited_by, edited_at } = historyData;
    const query = 'UPDATE history SET transaction_id = $1, name = $2, status = $3, type = $4, created_by = $5, created_at = $6, edited_by = $7, edited_at = $8 WHERE id = $9';
    return await pool.query(query, [transaction_id, name, status, type, created_by, created_at, edited_by, edited_at, id]);
  }

  async deleteHistory(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM history WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new HistoryRepository();
