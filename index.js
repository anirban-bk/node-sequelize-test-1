const app = require('./routes/index_routes');

//port
const port = 8085;

//server
app.listen(port, ()=>{console.log(`server listening on port ${port}`)});