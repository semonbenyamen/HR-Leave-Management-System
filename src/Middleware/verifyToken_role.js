const jwt = require("jsonwebtoken")
////////////////////////////////
/* chech for token */
function verifyTocken(req, res, next) {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    const token = req.headers.authorization?.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
  ////////////////////////////////////
/* allow only each user update his data  */
function verifyTokenAndAuthorization(req, res, next) {
    verifyTocken(req, res, () => {
        if (req.user.id === req.params.id)

            next();
        else {
            return res.status(403).json({ message: "you are not allowed " })
        }
    })
}
/////////////////////////////
/* check role for only hr to allow*/
function verifyHR(req, res, next) {
    verifyTocken(req, res, () => {
        if (req.user.role === "HR") {
            next();
        } else {
            return res.status(403).json({ message: "only HR allowed" })
        }
    })
}
/////////////////////////////////////////
/* check role for only emp to allow*/
function verifyEmp(req, res, next) {
    verifyTocken(req, res, () => {

        if (req.user.role === "employee")
            next();
        else
            res.status(403).json({
                messaage: "Access denied, only employee allowed"
            })
    })
}
module.exports = {  
    verifyTocken,
    verifyTokenAndAuthorization,
    verifyHR,
    verifyEmp

}
