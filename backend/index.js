const express = require('express');
const connectToMongo = require('./db');
connectToMongo();
const app = express();
const port = process.env.PORT || 3004;
const cors = require('cors');  // Make sure this is correctly placed

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
    res.send('Hello Hritik');
});

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}!`);
});
