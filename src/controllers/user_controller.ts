import { Request, Response } from 'express';
import userRepository from '../repositories/user_repository';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const result = await userRepository.getAllUsers();
      res.send(result.rows);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      const result = await userRepository.getUserById(userId);
      if (result.rows.length > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('User not found');
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      await userRepository.createUser(name, email, password);
      res.send('User created successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
      await userRepository.updateUser(userId, name, email, password);
      res.send('User updated successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    try {
      await userRepository.deleteUser(userId);
      res.send('User deleted successfully');
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new UserController();
