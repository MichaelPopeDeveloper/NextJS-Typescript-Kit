"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRouter = void 0;
var express_1 = require("express");
var Yelp_1 = require("./Yelp");
exports.APIRouter = express_1.Router()
    .use('/business', Yelp_1.YelpRouter)
    .get('/', function (req, res) { return res.send('API home page'); });
