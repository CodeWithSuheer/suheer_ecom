import path from 'path';
import cors from "cors";
import express from 'express';
import { config } from "dotenv";
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

config({
    path: "./data/config.env"
})

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: '*' }));


app.use('/api/v1/auth', userRouter);
app.use('/api/v1/product', productRouter);


// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve frontend
if (process.env.NODE_ENV === 'Production') {
    const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');

    app.use(express.static(frontendPath));

    app.get('*', (req, res) => res.sendFile(path.resolve(frontendPath, 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('Set to Production');
    })
}

app.use(errorHandler);
