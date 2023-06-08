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
class RequestPaymentRepository {
    getAllRequestPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM request_payment';
            return yield arto_prod_datasource_1.default.query(query);
        });
    }
    getRequestPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM request_payment WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
    createRequestPayment(requestPaymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at } = requestPaymentData;
            const query = 'INSERT INTO request_payment (transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            return yield arto_prod_datasource_1.default.query(query, [transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at]);
        });
    }
    updateRequestPayment(id, requestPaymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at } = requestPaymentData;
            const query = 'UPDATE request_payment SET transaction_id = $1, name = $2, type = $3, action = $4, status = $5, created_by = $6, created_at = $7, edited_by = $8, edited_at = $9 WHERE id = $10';
            return yield arto_prod_datasource_1.default.query(query, [transaction_id, name, type, action, status, created_by, created_at, edited_by, edited_at, id]);
        });
    }
    deleteRequestPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM request_payment WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
}
exports.default = new RequestPaymentRepository();
