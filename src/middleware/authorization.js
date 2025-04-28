
const isAuthorized = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization
        if (token === process.env.VERIFICATION_TOKEN) {
            return next()
        }
        const err = new Error("Not authorized!");
        err.status = 403;
        return next(err);
    } catch (error) {
        const err = new Error("Not authorized!");
        err.status = 403;
        return next(err);
    }
}

module.exports = {
    isAuthorized
}