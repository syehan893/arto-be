import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class BankRepository {
  async getAllBanks(): Promise<QueryResult> {
    const query = 'SELECT * FROM bank';
    return await pool.query(query);
  }

  async getBankById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM bank WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async createBank(walletId: number, name: string, bankCode: string, bankAccount: string, type: string): Promise<QueryResult> {
    const query = 'INSERT INTO bank (wallet_id, name, bank_code, bank_account, type) VALUES ($1, $2, $3, $4, $5)';
    return await pool.query(query, [walletId, name, bankCode, bankAccount, type]);
  }

  async updateBank(id: number, walletId: number, name: string, bankCode: string, bankAccount: string, type: string): Promise<QueryResult> {
    const query = 'UPDATE bank SET wallet_id = $1, name = $2, bank_code = $3, bank_account = $4, type = $5 WHERE id = $6';
    return await pool.query(query, [walletId, name, bankCode, bankAccount, type, id]);
  }

  async deleteBank(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM bank WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new BankRepository();
