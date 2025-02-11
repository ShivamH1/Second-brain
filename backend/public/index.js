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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const cors_1 = __importDefault(require("cors"));
const util_1 = require("./util");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupSchema = zod_1.z.object({
        username: zod_1.z.string().min(1),
        password: zod_1.z.string().min(4),
    });
    const { username, password } = signupSchema.parse(req.body);
    const hashedPassword = yield bcrypt_1.default.hash(password, 12);
    try {
        const user = yield db_1.UserModel.create({
            username,
            password: hashedPassword,
        });
        res.json({
            message: "User signed up",
            user,
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists",
        });
    }
}));
// Zod is not required for signin, but it can be useful for input validation.
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signinSchema = zod_1.z.object({
        username: zod_1.z.string().min(1),
        password: zod_1.z.string().min(4),
    });
    const { username, password } = signinSchema.parse(req.body);
    //First check if the user exists
    const existingUser = yield db_1.UserModel.findOne({ username });
    if (existingUser) {
        //Then check if the password is correct using bcrypt.compare() method.
        const isPasswordValid = (existingUser === null || existingUser === void 0 ? void 0 : existingUser.password)
            ? yield bcrypt_1.default.compare(password, existingUser.password)
            : false;
        if (isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, config_1.JWT_PASS);
            res.json({
                message: "User signed in",
                token,
            });
        }
        else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    }
    else {
        res.status(401).json({ message: "Invalid username or password" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title } = req.body;
    try {
        const content = yield db_1.ContentModel.create({
            type,
            link,
            title,
            //@ts-ignore
            userId: req.userId,
            tags: [],
        });
        res.json({
            message: "Content Addded",
            content,
        });
    }
    catch (e) {
        res.status(400).json({ message: "Failed to add the content" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        //usage of references (foreign keys)
        const contents = yield db_1.ContentModel.find({ userId }).populate("userId", "username");
        res.json({
            message: "Your content: ",
            contents,
        });
    }
    catch (e) {
        res.status(400).json({ message: "Failed to get the content" });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    try {
        yield db_1.ContentModel.deleteMany({
            contentId,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Deleted",
        });
    }
    catch (e) {
        res.status(400).json({ message: "Failed to delete the content" });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
            });
            return;
        }
        const hash = (0, util_1.random)(10);
        yield db_1.LinkModel.create({
            hash,
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            hash,
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });
        res.json({
            message: "Removed link",
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash,
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input",
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: link.userId,
    });
    console.log(link);
    const user = yield db_1.UserModel.findOne({
        _id: link.userId,
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen",
        });
        return;
    }
    res.json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content,
    });
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
