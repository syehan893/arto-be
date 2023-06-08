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
class HistoryRepository {
    getAllHistories() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM history';
            return yield arto_prod_datasource_1.default.query(query);
        });
    }
    getHistoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM history WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
    createHistory(historyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transaction_id, name, status, type, created_by, created_at, edited_by, edited_at } = historyData;
            const query = 'INSERT INTO history (transaction_id, name, status, type, created_by, created_at, edited_by, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
            return yield arto_prod_datasource_1.default.query(query, [transaction_id, name, status, type, created_by, created_at, edited_by, edited_at]);
        });
    }
    updateHistory(id, historyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transaction_id, name, status, type, created_by, created_at, edited_by, edited_at } = historyData;
            const query = 'UPDATE history SET transaction_id = $1, name = $2, status = $3, type = $4, created_by = $5, created_at = $6, edited_by = $7, edited_at = $8 WHERE id = $9';
            return yield arto_prod_datasource_1.default.query(query, [transaction_id, name, status, type, created_by, created_at, edited_by, edited_at, id]);
        });
    }
    deleteHistory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM history WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
}
exports.default = new HistoryRepository();
