import express from 'express';
import cors from 'cors';

const app = express();

// const corsOptions = {
//     origin: ['http://localhost:3003', 'http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});