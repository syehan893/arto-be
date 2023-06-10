import { Request, Response } from 'express';
import userRepository from '../repositories/user_repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const SECRET_KEY = 'secret-key';

        try {
            const user = await userRepository.getUserByEmail(email);

            if (!user) {
                res.status(401).json({ message: 'Username atau password salah.' });
                return;
            }

            const userPassword = user.rows[0]['password'];

            const passwordMatch = await bcrypt.compare(password, userPassword);

            if (!passwordMatch) {
                res.status(401).json({ message: 'Username atau password salah.' });
                return;
            }

            const token = jwt.sign({ email, password }, SECRET_KEY);

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
        }
    }
}

export default new LoginController();
