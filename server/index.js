const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Task routes
app.use('/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
