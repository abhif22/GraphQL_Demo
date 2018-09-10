const graphQL = require("graphql");
const axios = require('axios');
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphQL;


const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLString},
        age: { type: GraphQLInt},
        firstName: { type: GraphQLString}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString}},
            resolve(parentVal, args){
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

