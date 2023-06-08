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
const request_payment_repository_1 = __importDefault(require("../repositories/request_payment_repository"));
class RequestPaymentController {
    getAllRequestPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield request_payment_repository_1.default.getAllRequestPayments();
                res.send(result.rows);
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    getRequestPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const result = yield request_payment_repository_1.default.getRequestPaymentById(id);
                if (result.rowCount > 0) {
                    res.send(result.rows[0]);
                }
                else {
                    res.status(404).send('Request Payment not found');
                }
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    createRequestPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestPaymentData = req.body;
            try {
                yield request_payment_repository_1.default.createRequestPayment(requestPaymentData);
                res.send('Request Payment created successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    updateRequestPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const requestPaymentData = req.body;
            try {
                yield request_payment_repository_1.default.updateRequestPayment(id, requestPaymentData);
                res.send('Request Payment updated successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    deleteRequestPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                yield request_payment_repository_1.default.deleteRequestPayment(id);
                res.send('Request Payment deleted successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = new RequestPaymentController();
