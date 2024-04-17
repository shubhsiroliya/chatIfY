import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import mainRouter from './routes/mainRouter.js';
import connect from './db/connect.js';
import {app,server} from './socket/socket.js';

const __dirname = path.resolve();
dotenv.config();

const PORT = process.env.PORT || 3000;

connect();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'/client/dist')));

app.use("/api/v1",mainRouter)
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'));
})


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});