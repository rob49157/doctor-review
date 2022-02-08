const { gql }=require('apollo-server-express')

const typeDefs=gql`

type Doctor{
    _id: ID
    name: String
    practice: String
    yearsofexperience: Int
    location: String
    thoughts: [Thought]
}
type User{
    _id:ID
    firstname: String
    lastname: String
    email: String
    password: String
}

type Thought{
    _id: ID
    thoughttext: String
    createat: String
    username: User
}
type Auth{
    token: ID
    user: User
}

type Query{
    doctor:[Doctor]
    doctors(_id:ID!, practice:String):Doctor
}

type Mutation{
    adduser(firstname:String,lastname:String,email:String,password:String):Auth
    updateUser(_id:ID,firstName: String, lastName: String, email: String, password: String): User
    addthought(thoughttext:String!,username:String!):Doctor
    removethought(_id:ID!,thoughttext:String):Doctor
    login(email: String!, password: String!): Auth
}
`

module.exports=typeDefs