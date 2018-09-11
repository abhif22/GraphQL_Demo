const graphQL = require("graphql");
const axios = require('axios');
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphQL;

const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: {
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        description: { type: GraphQLString}
    }
});

const UserType = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLString},
        age: { type: GraphQLInt},
        firstName: { type: GraphQLString},
        company: { 
            type: CompanyType,
            resolve(parentValue, args){
                console.log(parentValue);
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then(resp => resp.data);
            }
        }
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
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString}},
            resolve(parentVal, args){
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                    .then(resp => resp.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

