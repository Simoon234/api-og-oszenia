import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'dotenv/config';
import {handleError} from "./utils/handleError";
import {add} from "./routes/ad";
import {apiLimiter} from "./utils/serverLimit";
import {config} from './config/config'
const app = express();


//middlewares
app.use(cors({
    origin: '*',
}));
app.use(json());
app.use(apiLimiter);

app.use('/api/ad', add);

//errors
app.use(handleError);


//listening
app.listen(3001, '0.0.0.0', () => {
    console.log('listening on port 3001, http://localhost:3001');
});
