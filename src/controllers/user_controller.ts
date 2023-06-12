import { Request, Response } from 'express';
import { decodeToken } from '../common/token';
import userRepository from '../repositories/user_repository';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await userRepository.getAllUsers();
        res.send(result.rows);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const email = req.params.email.toString();
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await userRepository.getUserByEmail(email);
        res.send({ 'response': result.rows });
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        const result = await userRepository.getUserById(userId);
        if (result.rows.length > 0) {
          res.send(result.rows[0]);
        } else {
          res.status(404).send('User not found');
        }
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await userRepository.createUser(name, email, password);
        res.send('User created successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await userRepository.updateUser(userId, name, email, password);
        res.send('User updated successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      if (decodeToken(req.headers.authorization || '')) {
        await userRepository.deleteUser(userId);
        res.send('User deleted successfully');
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new UserController();
