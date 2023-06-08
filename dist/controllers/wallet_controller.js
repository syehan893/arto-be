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
const wallet_repository_1 = __importDefault(require("../repositories/wallet_repository"));
class WalletController {
    getAllWallets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield wallet_repository_1.default.getAllWallets();
                res.send(result.rows);
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    getWalletById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletId = parseInt(req.params.id);
            try {
                const result = yield wallet_repository_1.default.getWalletById(walletId);
                if (result.rowCount > 0) {
                    res.send(result.rows[0]);
                }
                else {
                    res.status(404).send('Wallet not found');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    createWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, balance, bank, card } = req.body;
            try {
                yield wallet_repository_1.default.createWallet(userId, balance, bank, card);
                res.send('Wallet created successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    updateWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletId = parseInt(req.params.id);
            const { userId, balance, bank, card } = req.body;
            try {
                yield wallet_repository_1.default.updateWallet(walletId, userId, balance, bank, card);
                res.send('Wallet updated successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    deleteWallet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletId = parseInt(req.params.id);
            try {
                yield wallet_repository_1.default.deleteWallet(walletId);
                res.send('Wallet deleted successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = new WalletController();
