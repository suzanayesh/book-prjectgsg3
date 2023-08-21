const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] [${req.method}] ${req.path}`);
    next();
};
export { loggerMiddleware };
