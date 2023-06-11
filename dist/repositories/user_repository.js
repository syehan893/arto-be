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
class UserRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM "user"';
            return yield arto_prod_datasource_1.default.query(query);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM "user" WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT *
    FROM "user"
    LEFT JOIN (
        wallet
        LEFT JOIN card ON wallet.id = card.wallet_id
    ) ON "user".id = wallet.user_id
    WHERE "user".email = $1
    
    UNION
    
    SELECT *
    FROM "user"
    RIGHT JOIN (
        wallet
        RIGHT JOIN card ON wallet.id = card.wallet_id
    ) ON "user".id = wallet.user_id
    WHERE "user".email = $2;`;
            const result = yield arto_prod_datasource_1.default.query(query, [email, email]);
            return result;
        });
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3)';
            return yield arto_prod_datasource_1.default.query(query, [name, email, password]);
        });
    }
    updateUser(id, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE "user" SET name = $1, email = $2, password = $3 WHERE id = $4';
            return yield arto_prod_datasource_1.default.query(query, [name, email, password, id]);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM "user" WHERE id = $1';
            return yield arto_prod_datasource_1.default.query(query, [id]);
        });
    }
}
exports.default = new UserRepository();
