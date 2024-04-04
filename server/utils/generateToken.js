import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (id,res)=>{
    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'15d'})
    res.cookie('token',token,{
            httpOnly:true,
            sameSite:true,
            maxAge:1000*60*60*24*15,
            secure : process.env.NODE_ENV !== "Development" 
        });
}

export default generateTokenAndSetCookie;