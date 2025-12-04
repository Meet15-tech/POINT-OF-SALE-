const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://frontend:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const billingRoutes = require('./routes/billingRoutes');
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/billing', billingRoutes);
app.use('/auth', authRoutes);
app.use('/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('POS Backend is running');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});