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
    const [id] = await db('project').insert(req.body);
    const result = await db('project')
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
 const result = await db('project')
 res.status(200).json(result);
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});

// app.get('/:id', (req, res) => {
//   Promise.all([
//     get(`http://localhost:3000/api/user`),
//     get(`http://localhost:3000/api/books`)
//   ]).then(([user, {books}]) =>
//     res.send({
//       user: user.name,
//       books
//     }))
//     .catch(err => res.send('Ops, something has gone wrong'))
// })

router.get('/:id', async (req, res)=>{
  try{

 const result = await db('project').where({ id: req.params.id }).first();
 const act = await db('action').where({projectID:req.params.id});
 const info = {
   result:result,
  actin:{...act}
 }
 
   
 if(result){

 res.status(200).json({info})
 }else{
  res.status(404).json({message: 'Records not found'})
 }
  }catch(error){
    const message = errors[error.errno] || 'Retry different value server error';
    res.status(500).json({message, error});
  }
});
module.exports = router;