const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send(`
    <h2>Action API</h2>
    <p>Welcome to the Lambda action API</p>
    `);
});
module.exports = router;