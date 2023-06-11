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
const transaction_repository_1 = __importDefault(require("../repositories/transaction_repository"));
const user_repository_1 = __importDefault(require("../repositories/user_repository"));
const wallet_repository_1 = __importDefault(require("../repositories/wallet_repository"));
const history_repository_1 = __importDefault(require("../repositories/history_repository"));
class TransactionController {
    getAllTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield transaction_repository_1.default.getAllTransactions();
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
    topUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionData = req.body;
                const { emailSender, detail, nominal, phoneNumber, ewallet } = transactionData;
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const sender = yield user_repository_1.default.getUserByEmail(emailSender);
                    const balanceSender = parseInt(sender.rows[0]['balance']) - parseInt(nominal);
                    yield wallet_repository_1.default.updateBalanceWallet(sender.rows[0]['wallet_id'], balanceSender);
                    const transactionParam = {
                        'wallet_id': sender.rows[0]['wallet_id'],
                        'nominal': nominal,
                        'bank_account': phoneNumber,
                        'email_receiver': emailSender,
                        'status': 'COMPLETED',
                        'detail': detail,
                        'created_by': emailSender,
                        'created_at': 'now()',
                        'edited_by': emailSender,
                        'edited_at': 'now()',
                    };
                    const transaction = yield transaction_repository_1.default.createTransaction(transactionParam);
                    const historySenderParam = {
                        'id': Math.floor((Math.random() * 10000000) + 1),
                        'transaction_id': transaction.rows[0].id,
                        'name': `Top Up ${ewallet} - ${phoneNumber}`,
                        'status': true,
                        'type': 'Top Up',
                        'created_by': emailSender,
                        'created_at': 'now()',
                        'edited_by': emailSender,
                        'edited_at': 'now()',
                    };
                    yield history_repository_1.default.createHistory(historySenderParam);
                    res.status(200).send(`Transfer Success ${transaction.rows[0].id}`);
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (error) {
                res.status(500).send(`Internal Server Error ${error}`);
            }
        });
    }
    transfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionData = req.body;
                const { emailSender, emailReceiver, detail, nominal, noRek } = transactionData;
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const sender = yield user_repository_1.default.getUserByEmail(emailSender);
                    const receiver = yield user_repository_1.default.getUserByEmail(emailReceiver);
                    if (noRek !== receiver.rows[0]['card_number']) {
                        console.log('error no rek ga sama');
                        res.status(500).send('Internal Server Error');
                    }
                    if (sender.rows[0]['balance'] < nominal) {
                        console.log('error saldo kurang');
                        res.status(500).send('Internal Server Error');
                    }
                    const balanceReceiver = parseInt(receiver.rows[0]['balance']) + parseInt(nominal);
                    yield wallet_repository_1.default.updateBalanceWallet(receiver.rows[0]['wallet_id'], balanceReceiver);
                    const balanceSender = parseInt(sender.rows[0]['balance']) - parseInt(nominal);
                    yield wallet_repository_1.default.updateBalanceWallet(sender.rows[0]['wallet_id'], balanceSender);
                    const transactionParam = {
                        'wallet_id': sender.rows[0]['wallet_id'],
                        'nominal': nominal,
                        'bank_account': noRek,
                        'email_receiver': emailReceiver,
                        'status': 'COMPLETED',
                        'detail': detail,
                        'created_by': emailSender,
                        'created_at': 'now()',
                        'edited_by': emailSender,
                        'edited_at': 'now()',
                    };
                    const transaction = yield transaction_repository_1.default.createTransaction(transactionParam);
                    const historySenderParam = {
                        'id': Math.floor((Math.random() * 10000000) + 1),
                        'transaction_id': transaction.rows[0].id,
                        'name': `Transfer ke Rekening ${receiver.rows[0]['name']}`,
                        'status': true,
                        'type': 'Transfer Keluar',
                        'created_by': emailSender,
                        'created_at': 'now()',
                        'edited_by': emailSender,
                        'edited_at': 'now()',
                    };
                    yield history_repository_1.default.createHistory(historySenderParam);
                    const historyReceiverParam = {
                        'id': Math.floor((Math.random() * 10000000) + 1),
                        'transaction_id': transaction.rows[0].id,
                        'name': `Transfer dari Rekening ${sender.rows[0]['name']}`,
                        'status': true,
                        'type': 'Transfer Keluar',
                        'created_by': emailReceiver,
                        'created_at': 'now()',
                        'edited_by': emailReceiver,
                        'edited_at': 'now()',
                    };
                    yield history_repository_1.default.createHistory(historyReceiverParam);
                    res.status(200).send(`Transfer Success ${transaction.rows[0].id}`);
                }
                else {
                    res.status(401).send('Unauthorized');
                }
            }
            catch (error) {
                res.status(500).send(`Internal Server Error ${error}`);
            }
        });
    }
    getTransactionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield transaction_repository_1.default.getTransactionById(id);
                    if (result.rowCount > 0) {
                        res.send(result.rows[0]);
                    }
                    else {
                        res.status(404).send('Transaction not found');
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
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactionData = req.body;
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield transaction_repository_1.default.createTransaction(transactionData);
                    res.send('Transaction created successfully');
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
    updateTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const transactionData = req.body;
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield transaction_repository_1.default.updateTransaction(id, transactionData);
                    res.send('Transaction updated successfully');
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
    deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield transaction_repository_1.default.deleteTransaction(id);
                    res.send('Transaction deleted successfully');
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
exports.default = new TransactionController();
