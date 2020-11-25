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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var Auth_1 = __importDefault(require("./Auth"));
// Routes
var routes_1 = require("./routes");
// Controllers
var Yelp_1 = require("./Controllers/API/Yelp");
var Loaders_1 = __importDefault(require("./Loaders"));
var PORT = process.env.PORT || 8080;
var apiKey = process.env.YelpAPIKey;
var startSever = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = express_1.default();
        dotenv_1.default.config();
        Yelp_1.YelpAPIController.init({ apiKey: apiKey });
        // const db = await mongooseLoader();
        // const bob = new User({ name: 'Bob', username: 'bob1', password: 'lol' });
        // bob.save()
        //     .then((record) => console.log('Record: ', record));
        app.use(Auth_1.default.initialize());
        app.use(Auth_1.default.session());
        app.use('/', routes_1.MainRouter);
        app.listen(PORT, function () { return console.log("Listening on port: " + PORT); });
        return [2 /*return*/];
    });
}); };
var Server = /** @class */ (function () {
    function Server() {
        this.port = process.env.PORT || 8080;
        this.app = express_1.default();
        this.passport = Auth_1.default;
        this.config();
    }
    Server.prototype.config = function () {
        dotenv_1.default.config();
    };
    Server.prototype.server = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initializeDB()];
                    case 1:
                        _a.sent();
                        // this.authMiddleware();
                        this.routes();
                        this.app.listen(this.port, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log('Listening on port: ', +this.port);
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.authMiddleware = function () {
        this.app.use(Auth_1.default.initialize());
        this.app.use(Auth_1.default.session());
    };
    Server.prototype.initializeDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Loaders_1.default()
                                .then(function () { console.log('Connected to db'); })
                                .catch(function (error) { console.log('Error: ', error); })];
                    case 1:
                        _a.db = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.routes = function () {
        this.app.use('/', routes_1.MainRouter);
    };
    return Server;
}());
new Server().server();
