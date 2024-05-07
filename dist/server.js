"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./db"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var category_routes_1 = __importDefault(require("./routes/category.routes"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = 1337;
(0, db_1.default)();
app.get("/ping", function (req, res) {
    res.send("Pong");
});
app.use("/user", user_routes_1.default);
app.use("/category", category_routes_1.default);
app.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
    console.log("Server up and running");
});
