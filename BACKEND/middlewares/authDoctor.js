import jwt from 'jsonwebtoken'

const authDoctor = async (req, res, next) => {
    try {
        const docToken = req.headers['doctoken'];

        if (!docToken) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        const decoded = jwt.verify(docToken, process.env.JWT_SECRET);
        req.docId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid or expired docToken" });
    }
};

export default authDoctor;
