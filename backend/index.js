const express = require('express');
const apiRouter = require('./routers/apiRouters')
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(apiRouter)
// Data file path

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
