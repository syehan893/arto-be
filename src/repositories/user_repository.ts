import { QueryResult } from 'pg';
import pool from '../datasources/arto_prod_datasource';

class UserRepository {
  async getAllUsers(): Promise<QueryResult> {
    const query = 'SELECT * FROM "user"';
    return await pool.query(query);
  }

  async getUserById(id: number): Promise<QueryResult> {
    const query = 'SELECT * FROM "user" WHERE id = $1';
    return await pool.query(query, [id]);
  }

  async getUserByEmail(email: String): Promise<QueryResult> {
    const query = `SELECT *
    FROM "user"
    LEFT JOIN (
        wallet
        LEFT JOIN card ON wallet.id = card.wallet_id
    ) ON "user".id = wallet.user_id
    WHERE "user".email = $1
    
    UNION
    
    SELECT *
    FROM "user"
    RIGHT JOIN (
        wallet
        RIGHT JOIN card ON wallet.id = card.wallet_id
    ) ON "user".id = wallet.user_id
    WHERE "user".email = $2;`;
    const result = await pool.query(query, [email, email]);
    return result;
  }

  async createUser(name: string, email: string, password: string): Promise<QueryResult> {
    const query = 'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3)';
    return await pool.query(query, [name, email, password]);
  }

  async updateUser(id: number, name: string, email: string, password: string): Promise<QueryResult> {
    const query = 'UPDATE "user" SET name = $1, email = $2, password = $3 WHERE id = $4';
    return await pool.query(query, [name, email, password, id]);
  }

  async deleteUser(id: number): Promise<QueryResult> {
    const query = 'DELETE FROM "user" WHERE id = $1';
    return await pool.query(query, [id]);
  }
}

export default new UserRepository();
