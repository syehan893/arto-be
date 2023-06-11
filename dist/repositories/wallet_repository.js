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
const arto_prod_datasource_1 = __importDefault(require("../datasources/arto_prod_datasource"));
class WalletRepository {
    getAllWallets() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM wallet';
            return yield arto_prod_datasource_1.default.query(query);
        });
    }
    getWalletById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM wallet WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
    createWallet(userId, balance, bank, card) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO wallet (user_id, balance, bank, card) VALUES ($1, $2, $3, $4)';
            return yield arto_prod_datasource_1.default.query(query, [userId, balance, bank, card]);
        });
    }
    updateWallet(id, userId, balance, bank, card) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE wallet SET user_id = $1, balance = $2, bank = $3, card = $4 WHERE id = $5';
            return yield arto_prod_datasource_1.default.query(query, [userId, balance, bank, card, id]);
        });
    }
    updateBalanceWallet(id, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE wallet SET balance = $1 WHERE id = $2';
            return yield arto_prod_datasource_1.default.query(query, [balance, id]);
        });
    }
    deleteWallet(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM wallet WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
}
exports.default = new WalletRepository();
