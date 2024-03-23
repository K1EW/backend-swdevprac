const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token || token !== process.env.API_KEY) {
        return res
            .status(401)
            .json({ success: false, message: 'Not authorize to access this route' });
    }

    next();
};

module.exports = protect;
