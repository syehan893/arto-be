import express from 'express';
import userController from './controllers/user_controller';
import bankController from './controllers/bank_controller';
import cardController from './controllers/card_controller';
import walletController from './controllers/wallet_controller';
import transactionController from './controllers/transaction_controller';
import requestPaymentController from './controllers/request_payment_controller';
import historyController from './controllers/history_controller';
import loginController from './controllers/login_controller';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// auth
app.post('/api/login', loginController.login);

// user routes
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUserById);
app.post('/api/users', userController.createUser);
app.put('/api/users/:id', userController.updateUser);
app.delete('/api/users/:id', userController.deleteUser);

// bank routes
app.get('/api/banks', bankController.getAllBanks);
app.get('/api/banks/:id', bankController.getBankById);
app.post('/api/banks', bankController.createBank);
app.put('/api/banks/:id', bankController.updateBank);
app.delete('/api/banks/:id', bankController.deleteBank);

// card routes
app.get('/api/cards', cardController.getAllCards);
app.get('/api/cards/:id', cardController.getCardById);
app.post('/api/cards', cardController.createCard);
app.put('/api/cards/:id', cardController.updateCard);
app.delete('/api/cards/:id', cardController.deleteCard);

// wallet routes
app.get('/api/wallets', walletController.getAllWallets);
app.get('/api/wallets/:id', walletController.getWalletById);
app.post('/api/wallets', walletController.createWallet);
app.put('/api/wallets/:id', walletController.updateWallet);
app.delete('/api/wallets/:id', walletController.deleteWallet);

// transaction routes
app.get('/api/transactions', transactionController.getAllTransactions);
app.get('/api/transactions/:id', transactionController.getTransactionById);
app.post('/api/transactions', transactionController.createTransaction);
app.put('/api/transactions/:id', transactionController.updateTransaction);
app.delete('/api/transactions/:id', transactionController.deleteTransaction);

// request payment routes
app.get('/api/request-payments', requestPaymentController.getAllRequestPayments);
app.get('/api/request-payments/:id', requestPaymentController.getRequestPaymentById);
app.post('/api/request-payments', requestPaymentController.createRequestPayment);
app.put('/api/request-payments/:id', requestPaymentController.updateRequestPayment);
app.delete('/api/request-payments/:id', requestPaymentController.deleteRequestPayment);

// history routes
app.get('/api/histories', historyController.getAllHistories);
app.get('/api/histories/:id', historyController.getHistoryById);
app.post('/api/histories', historyController.createHistory);
app.put('/api/histories/:id', historyController.updateHistory);
app.delete('/api/histories/:id', historyController.deleteHistory);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
