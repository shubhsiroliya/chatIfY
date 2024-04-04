import mongoose from "mongoose";

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI).then((data)=>{
            console.log(`Connected to the database ${data.connection.host}`);
        })

    }
    catch(err)
    {
        console.error(`Error connecting to the database ${err}`);
    }
}

export default connect;