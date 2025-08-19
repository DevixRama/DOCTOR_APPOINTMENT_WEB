import jwt from 'jsonwebtoken'

//admin auth middleware
const authAdmin = async (req, res, next) => {
    try {
        const { admintoken } = req.headers;
        // console.log("Received token:", req.headers.admintoken);

        
        if (!admintoken) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }

        const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Not authorised" });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};



export default authAdmin