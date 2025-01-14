const { log } = require('console');
const app = require('./src/app')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')

dotenv.config()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

connectDB();