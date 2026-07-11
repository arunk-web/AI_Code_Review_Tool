const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: 'https://ai-code-review-tool-l4ymjwffq-arunk1.vercel.app',
  credentials: true
}));



const authRoutes = require('./routes/authRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');

const chatRoutes = require('./routes/chatRoutes');



// MIDDLEWARES
// app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// "ab saari auth routes /api/auth se start hongi — matlab signup ka URL hoga /api/auth/signup aur login ka /api/auth/login"
// app.use('/api/reviews', reviewRoutes);
app.use('/api/chat', chatRoutes);

//test route haiii
app.get('/', (req, res) => {
    res.json({message: 'AI code review API Running!'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
});