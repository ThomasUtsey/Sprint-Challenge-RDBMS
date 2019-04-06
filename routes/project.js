const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(`
    <h2>Project API</h2>
    <p>Welcome to the Lambda Project API</p>
    `);
});
module.exports = router;