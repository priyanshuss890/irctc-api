module.exports = (req, res, next) => {
    const apiKey = req.header('X-API-KEY');
    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).send('Invalid API key');
    }
    next();
};