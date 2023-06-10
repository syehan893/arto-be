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
const history_repository_1 = __importDefault(require("../repositories/history_repository"));
class HistoryController {
    getAllHistories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield history_repository_1.default.getAllHistories();
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
    getHistoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield history_repository_1.default.getHistoryById(id);
                    if (result.rowCount > 0) {
                        res.send(result.rows[0]);
                    }
                    else {
                        res.status(404).send('History not found');
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
    createHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const historyData = req.body;
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    const result = yield history_repository_1.default.getAllHistories();
                    res.send(result.rows);
                }
                else {
                    res.status(401).send('Unauthorized');
                }
                yield history_repository_1.default.createHistory(historyData);
                res.send('History created successfully');
            }
            catch (err) {
                res.status(500).send('Internal Server Error');
            }
        });
    }
    updateHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const historyData = req.body;
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield history_repository_1.default.updateHistory(id, historyData);
                    res.send('History updated successfully');
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
    deleteHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                if ((0, token_1.decodeToken)(req.headers.authorization || '')) {
                    yield history_repository_1.default.deleteHistory(id);
                    res.send('History deleted successfully');
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
exports.default = new HistoryController();
