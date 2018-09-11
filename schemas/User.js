const graphQL = require("graphql");
const axios = require('axios');
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull

} = graphQL;

const CompanyType = new GraphQLObjectType({
    name: 'company',
    fields: ()=>({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        users: {
            type: new GraphQLList(UserType),
            resolve(parentVal, args){
                // console.log(parentVal);
                return axios.get(`http://localhost:3000/companies/${parentVal.id}/users/`)
                    .then(resp => resp.data)
            }
        }
    })
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
                // console.log(parentValue);
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

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)},
                companyId: { type: GraphQLString}
            },
            resolve(parentVal, args){
                return axios.post(`http://localhost:3000/users`, args)
                    .then(resp => resp.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString)}},
            resolve(parentVal, args){
                // console.log(args);
                return axios.delete(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data)
            }
        },
        modifyUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString)},
                firstName: { type: GraphQLString},
                age: { type: GraphQLInt},
                companyId: { type: GraphQLString}
            },
            resolve(parentVal, args){
                return axios.patch(`http://localhost:3000/users/${args.id}`, args)
                    .then(resp => resp.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});

