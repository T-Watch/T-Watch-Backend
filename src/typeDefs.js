const typeDefs = `
  scalar Date
  enum UserType {
    ADMIN
    COACH
    USER
  }

  enum Gender {
    M
    F
  }

  enum MessageType {
    REGULAR
    JOIN
  }

  enum PlanType {
    PRO
    ADVANCED
    BEGINNER
  }

  type JWT {
    error: String
    token: String
  }

  type Location {
    lat: Float
    lng: Float
  }

  type Training {
    type: String!
    coach: String!
    user: String!
    date: Date
    maxDate: Date
    description: String
    trainingBlocks: [TrainingBlock]
    result: String #-------------------------
    completed: Boolean!
  }

  type TrainingBlock {
    coach: String!
    distance: Int
    duration: Int
    maxHR: Int
    minHR: Int
    maxSpeed: Float
    minSpeed: Float
    elevation: Int #------------???
  }

  type Message {
    _id: String!
    type: MessageType!
    from: String!
    to: String!
    date: Date!
    subject: String!
    body: String
  }

  type Plan {
    _id: String!
    type: PlanType!
    testLocations: [Location]#--------------------------
    monthlyPrice: Int
  }

  type User {
    _id: String!
    type: UserType!
    password: String!
    name: String!
    lastName: String!
    birthday: Date!
    address: String
    email: String!
    phoneNumber: String
    gender: Gender!
    weight: Float!
    height: Float!
    diseases: [String]
    allergies: [String]
    surgeries: [String]
    plan: Plan
    registryDate: Date
    photo: String #-------------------------
    testResults: [String] #-----------------
  }

  input UserInput {
    type: UserType!
    password: String!
    name: String!
    lastName: String!
    birthday: Date!
    address: String
    email: String!
    phoneNumber: String
    gender: Gender!
    weight: Float!
    height: Float!
    diseases: [String]
    allergies: [String]
    surgeries: [String]
    plan: String
    photo: String
  }

  type Query {
    token(email: String!, password: String!): JWT
    user(id: String!): User
    users: [User]
    trainings(userId: String, coachId: String, completed: Boolean): [Training]
    plans: [Plan]
    messages(type: MessageType!, to: String!): [Message]
  }

  type Mutation {
    user(input: UserInput!): Boolean
  }
`;

module.exports = typeDefs;
