"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user_repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const SECRET_KEY = 'secret-key';
            try {
                const user = yield user_repository_1.default.getUserByEmail(email);
                if (!user) {
                    res.status(401).json({ message: 'Username atau password salah.' });
                    return;
                }
                const userPassword = user.rows[0]['password'];
                const passwordMatch = yield bcrypt_1.default.compare(password, userPassword);
                if (!passwordMatch) {
                    res.status(401).json({ message: 'Username atau password salah.' });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ email, password }, SECRET_KEY);
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
            }
        });
    }
}
exports.default = new LoginController();
