"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
var express_1 = require("express");
var API_1 = require("./API");
exports.MainRouter = express_1.Router()
    .use('/api', API_1.APIRouter)
    .get('/', function (req, res) { return res.send('Hello World!'); });
