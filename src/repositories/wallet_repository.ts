import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class WalletRepository {
  async getAllWallets(): Promise<QueryResult> {
    const query = 'SELECT * FROM wallet';
    return await pool.query(query);
  }

  async getWalletById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM wallet WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async createWallet(userId: number, balance: number, bank: string, card: string): Promise<QueryResult> {
    const query = 'INSERT INTO wallet (user_id, balance, bank, card) VALUES ($1, $2, $3, $4)';
    return await pool.query(query, [userId, balance, bank, card]);
  }

  async updateWallet(id: number, userId: number, balance: number, bank: string, card: string): Promise<QueryResult> {
    const query = 'UPDATE wallet SET user_id = $1, balance = $2, bank = $3, card = $4 WHERE id = $5';
    return await pool.query(query, [userId, balance, bank, card, id]);
  }

  async updateBalanceWallet(id: number, balance: number): Promise<QueryResult> {
    const query = 'UPDATE wallet SET balance = $1 WHERE id = $2';
    return await pool.query(query, [balance, id]);
  }

  async deleteWallet(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM wallet WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new WalletRepository();
