"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    isEditable: {
        type: Boolean,
        required: true,
        default: true,
    },
    color: {
        id: String,
        name: String,
        code: String,
    },
    icon: {
        id: String,
        name: String,
        symbol: String,
    },
    User: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
var Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
