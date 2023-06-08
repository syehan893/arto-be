import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class CardRepository {
  async getAllCards(): Promise<QueryResult> {
    const query = 'SELECT * FROM card';
    return await pool.query(query);
  }

  async getCardById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM card WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async createCard(walletId: number, name: string, cardType: string, cardNumber: string, type: string): Promise<QueryResult> {
    const query = 'INSERT INTO card (wallet_id, name, card_type, card_number, type) VALUES ($1, $2, $3, $4, $5)';
    return await pool.query(query, [walletId, name, cardType, cardNumber, type]);
  }

  async updateCard(id: number, walletId: number, name: string, cardType: string, cardNumber: string, type: string): Promise<QueryResult> {
    const query = 'UPDATE card SET wallet_id = $1, name = $2, card_type = $3, card_number = $4, type = $5 WHERE id = $6';
    return await pool.query(query, [walletId, name, cardType, cardNumber, type, id]);
  }

  async deleteCard(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM card WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new CardRepository();
