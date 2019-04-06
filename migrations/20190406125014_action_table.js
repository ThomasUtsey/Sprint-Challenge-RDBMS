
exports.up = function(knex) {
  return knex.schema.createTable('action', (tbl)=>{
    tbl.increments();//primary key command defaults as ID

    tbl.string('name',128)
       .notNullable()
       .unique();

       tbl.integer('projectID')
       .references('ID')
       .inTable('project')
  
}
  )
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExist('action');
};
