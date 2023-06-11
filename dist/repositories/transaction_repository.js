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
class TransactionRepository {
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM transaction';
            return yield arto_prod_datasource_1.default.query(query);
        });
    }
    getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM transaction WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
    createTransaction(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at } = transactionData;
            const query = 'INSERT INTO transaction (wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
            return yield arto_prod_datasource_1.default.query(query, [wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at]);
        });
    }
    updateTransaction(id, transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at } = transactionData;
            const query = 'UPDATE transaction SET wallet_id = $1, nominal = $2, bank_account = $3, email_receiver = $4, status = $5, detail = $6, created_by = $7, created_at = $8, edited_by = $9, edited_at = $10 WHERE id = $11';
            return yield arto_prod_datasource_1.default.query(query, [wallet_id, nominal, bank_account, email_receiver, status, detail, created_by, created_at, edited_by, edited_at, id]);
        });
    }
    deleteTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM transaction WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
}
exports.default = new TransactionRepository();
