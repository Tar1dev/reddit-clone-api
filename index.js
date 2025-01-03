const express = require('express');
const db = require('./src/database');

const routes = require('./src/routes/main');

const app = express();
const PORT = Bun.env.PORT || 3000;


// trying to connect to the database
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(express.json());
app.use('/api/v1/', routes);

// running the API
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})