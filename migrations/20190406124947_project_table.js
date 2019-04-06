
exports.up = function(knex) {
  return knex.schema.createTable('project', (tbl)=>{
    tbl.increments();//primary key command defaults as ID

    tbl.string('name',128)
       .notNullable()
       .unique();

    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExist('project');
};
