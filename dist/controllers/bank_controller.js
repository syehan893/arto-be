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
const bank_repository_1 = __importDefault(require("../repositories/bank_repository"));
class BankController {
    getAllBanks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bank_repository_1.default.getAllBanks();
                res.send(result.rows);
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    getBankById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankId = parseInt(req.params.id);
            try {
                const result = yield bank_repository_1.default.getBankById(bankId);
                if (result.rowCount > 0) {
                    res.send(result.rows[0]);
                }
                else {
                    res.status(404).send('Bank not found');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    createBank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { walletId, name, bankCode, bankAccount, type } = req.body;
            try {
                yield bank_repository_1.default.createBank(walletId, name, bankCode, bankAccount, type);
                res.send('Bank created successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    updateBank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankId = parseInt(req.params.id);
            const { walletId, name, bankCode, bankAccount, type } = req.body;
            try {
                yield bank_repository_1.default.updateBank(bankId, walletId, name, bankCode, bankAccount, type);
                res.send('Bank updated successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    deleteBank(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bankId = parseInt(req.params.id);
            try {
                yield bank_repository_1.default.deleteBank(bankId);
                res.send('Bank deleted successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = new BankController();
