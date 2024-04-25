const app = require('./app');
require('dotenv').config();
require('./src/configurations/database')
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`port is running at: http://localhost:${port}`)
})

