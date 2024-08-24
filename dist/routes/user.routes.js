"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const UserRepository_1 = require("../modules/user/repositories/UserRepository");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const userRespository = new UserRepository_1.UserRespository();
userRoutes.post("/sign-up", (Request, Response) => {
    userRespository.create(Request, Response);
});
userRoutes.post("/sign-in", (Request, Response) => {
    userRespository.login(Request, Response);
});
