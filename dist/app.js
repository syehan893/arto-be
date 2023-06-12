"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user_controller"));
const bank_controller_1 = __importDefault(require("./controllers/bank_controller"));
const card_controller_1 = __importDefault(require("./controllers/card_controller"));
const wallet_controller_1 = __importDefault(require("./controllers/wallet_controller"));
const transaction_controller_1 = __importDefault(require("./controllers/transaction_controller"));
const request_payment_controller_1 = __importDefault(require("./controllers/request_payment_controller"));
const history_controller_1 = __importDefault(require("./controllers/history_controller"));
const login_controller_1 = __importDefault(require("./controllers/login_controller"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('combined'));
// auth
app.post('/api/login', login_controller_1.default.login);
// user routes
app.get('/api/users', user_controller_1.default.getAllUsers);
app.get('/api/users/:id', user_controller_1.default.getUserById);
app.post('/api/users', user_controller_1.default.createUser);
app.put('/api/users/:id', user_controller_1.default.updateUser);
app.delete('/api/users/:id', user_controller_1.default.deleteUser);
app.get('/api/getUserByEmail/:email', user_controller_1.default.getUserByEmail);
// bank routes
app.get('/api/banks', bank_controller_1.default.getAllBanks);
app.get('/api/banks/:id', bank_controller_1.default.getBankById);
app.post('/api/banks', bank_controller_1.default.createBank);
app.put('/api/banks/:id', bank_controller_1.default.updateBank);
app.delete('/api/banks/:id', bank_controller_1.default.deleteBank);
// card routes
app.get('/api/cards', card_controller_1.default.getAllCards);
app.get('/api/cards/:id', card_controller_1.default.getCardById);
app.post('/api/cards', card_controller_1.default.createCard);
app.put('/api/cards/:id', card_controller_1.default.updateCard);
app.delete('/api/cards/:id', card_controller_1.default.deleteCard);
// wallet routes
app.get('/api/wallets', wallet_controller_1.default.getAllWallets);
app.get('/api/wallets/:id', wallet_controller_1.default.getWalletById);
app.post('/api/wallets', wallet_controller_1.default.createWallet);
app.put('/api/wallets/:id', wallet_controller_1.default.updateWallet);
app.delete('/api/wallets/:id', wallet_controller_1.default.deleteWallet);
// transaction routes
app.get('/api/transactions/:email', transaction_controller_1.default.getAllTransactions);
app.get('/api/transactions/:id', transaction_controller_1.default.getTransactionById);
app.post('/api/transactions', transaction_controller_1.default.createTransaction);
app.put('/api/transactions/:id', transaction_controller_1.default.updateTransaction);
app.delete('/api/transactions/:id', transaction_controller_1.default.deleteTransaction);
app.post('/api/transactions/transfer', transaction_controller_1.default.transfer);
app.post('/api/transactions/topUp', transaction_controller_1.default.topUp);
app.post('/api/transactions/requestPayment', transaction_controller_1.default.requestPayment);
app.get('/api/transactions/getRequestPayment/:email', transaction_controller_1.default.getAllTransactionsByType);
app.post('/api/transactions/requestPaymentApproval', transaction_controller_1.default.approveRejectRequestPayment);
// request payment routes
app.get('/api/request-payments', request_payment_controller_1.default.getAllRequestPayments);
app.get('/api/request-payments/:id', request_payment_controller_1.default.getRequestPaymentById);
app.post('/api/request-payments', request_payment_controller_1.default.createRequestPayment);
app.put('/api/request-payments/:id', request_payment_controller_1.default.updateRequestPayment);
app.delete('/api/request-payments/:id', request_payment_controller_1.default.deleteRequestPayment);
// history routes
app.get('/api/histories/:email', history_controller_1.default.getAllHistories);
app.get('/api/histories/:id', history_controller_1.default.getHistoryById);
app.post('/api/histories', history_controller_1.default.createHistory);
app.put('/api/histories/:id', history_controller_1.default.updateHistory);
app.delete('/api/histories/:id', history_controller_1.default.deleteHistory);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
