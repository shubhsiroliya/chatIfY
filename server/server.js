import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import mainRouter from './routes/mainRouter.js';
import connect from './db/connect.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connect();
app.use(express.json());
app.use(cookieParser());



app.use("/api/v1",mainRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});