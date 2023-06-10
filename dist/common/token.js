"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'secret-key';
const decodeToken = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return decodedToken;
    }
    catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};
exports.decodeToken = decodeToken;
