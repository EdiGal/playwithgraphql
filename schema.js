const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const customers = [
    {id: '1', name: 'Edi', email:'edi@gmail.com', age: 25},
    {id: '2', name: 'Steve', email:'steve@gmail.com', age: 31},
    {id: '3', name: 'John', email:'john@gmail.com', age: 33},
    {id: '4', name: 'Sara', email:'sara@gmail.com', age: 28}
]

const CustomerType = new GraphQLObjectType({
    name: 'Cutomer',
    fields: () => ({
        id:    {type: GraphQLString},
        name:  {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return customers.find(customer => customer.id == args.id);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(){
                return customers;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});
