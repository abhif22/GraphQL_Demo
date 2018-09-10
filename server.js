const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schemas/User');

const app = express();
const port = 3030;

app.use('/graphQL', expressGraphQL({
    schema,
    graphiql: true
}));

app.listen(port, (err)=>{
    if(err)
        return err;
    console.log(`Listening on ${port}`);
});