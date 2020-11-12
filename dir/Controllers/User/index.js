"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConrtoller = void 0;
var Index_1 = __importDefault(require("../../Models/User/Index"));
var UserConrtoller = /** @class */ (function () {
    function UserConrtoller() {
    }
    UserConrtoller.create = function (config) {
        var user = new Index_1.default(config);
        return user.save();
    };
    UserConrtoller.get = function (id) { };
    UserConrtoller.update = function (id, config) { };
    UserConrtoller.delete = function (id, config) { };
    return UserConrtoller;
}());
exports.UserConrtoller = UserConrtoller;
