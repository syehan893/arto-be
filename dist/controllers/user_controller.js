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
const token_1 = require("../common/token");
const user_repository_1 = __importDefault(require("../repositories/user_repository"));
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield user_repository_1.default.getAllUsers();
                    res.send(result.rows);
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield user_repository_1.default.getUserById(userId);
                    if (result.rows.length > 0) {
                        res.send(result.rows[0]);
                    }
                    else {
                        res.status(404).send('User not found');
                    }
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield user_repository_1.default.createUser(name, email, password);
                    res.send('User created successfully');
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            const { name, email, password } = req.body;
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield user_repository_1.default.updateUser(userId, name, email, password);
                    res.send('User updated successfully');
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.id);
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield user_repository_1.default.deleteUser(userId);
                    res.send('User deleted successfully');
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = new UserController();
