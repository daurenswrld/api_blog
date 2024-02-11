const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my_blog_api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api', blogRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
