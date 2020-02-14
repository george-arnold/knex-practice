require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

function searchByProductName(searchTerm) {
  knexInstance
    .select('view_id','name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

function paginateProducts(page) {
  const projectsPerPage = 6;
  const offset = projectsPerPage - 1 ;
  knexInstance
  .select('view_id', 'name', 'price', 'date_added', 'checked', 'category')
  .from(shopping_list)
  .limit(projectsPerPage)
  .offset(offset)
  .then(result => {
    console.log(result);
  })
}
function productAddedDaysAgo(days){
  knexInstance
  .select('view_id', 'name', 'price', 'date_added', 'checked', 'category')
  .from('shopping_list')
  .where(
    '.date_added',
    '>',
    knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo) )

  .then(results => {
    console.log(results)
  })
}
function costPerCategory() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log('COST PER CATEGORY')
      console.log(result)
    })
}

costPerCategory()