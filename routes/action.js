const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
  client:'sqlite3',
  useNullAsDefault: true,
  connection:{
    filename:'./data/lambda.sqlite3'
  }
}

const db = knex(knexConfig)
const errors = { 
  '19':'Another entree has the same value no duplicates'
}
router.post('/',async (req, res) => {
  try {
    const [id] = await db('action').insert(req.body);
    const result = await db('action')
    .where({id})
    .first()
    res.status(201).json(result);
  } catch (error) {
    // log error to database
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
  
})


router.get('/', async (req, res)=>{
  try{
 const result = await db('action')
 res.status(200).json(result);
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});
module.exports = router;