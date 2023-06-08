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
class CardRepository {
    getAllCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM card';
            return yield arto_prod_datasource_1.default.query(query);
        });
    }
    getCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM card WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
    createCard(walletId, name, cardType, cardNumber, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO card (wallet_id, name, card_type, card_number, type) VALUES ($1, $2, $3, $4, $5)';
            return yield arto_prod_datasource_1.default.query(query, [walletId, name, cardType, cardNumber, type]);
        });
    }
    updateCard(id, walletId, name, cardType, cardNumber, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE card SET wallet_id = $1, name = $2, card_type = $3, card_number = $4, type = $5 WHERE id = $6';
            return yield arto_prod_datasource_1.default.query(query, [walletId, name, cardType, cardNumber, type, id]);
        });
    }
    deleteCard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM card WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
}
exports.default = new CardRepository();
