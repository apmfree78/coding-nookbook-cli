"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cell_1 = require("./routes/cell");
// import { createProxyMiddleware } from 'http-proxy-middleware';
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    // channel request through routes
    app.use((0, cell_1.createCellsRouter)(filename, dir));
    const packagePath = require.resolve('@javascriptnotebook/local-client/build/index.html');
    app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    // setting up proxy to catch requests going to react app
    // app.use(
    //   createProxyMiddleware({
    //     target: 'http://localhost:3000/',
    //     ws: true,
    //   })
    // );
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
