const graphQL = require("graphql");
const _ = require('lodash');
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphQL;

const users = [
    {id: "1", age: 23, firstName: "Abhishek"},
    {id: "2", age: 22, firstName: "Surbhi"},
    {id: "3", age: 18, firstName: "Mansi"},
    {id: "4", age: 50, firstName: "Sudha"}
]

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
                return _.find(users, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

