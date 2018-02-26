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

  type LocationPoint {
    type: String!
    coordinates: [Float!]!
  }

  input LocationPointInput {
    type: String!
    coordinates: [Float!]!
  }

  type Training {
    _id: String!
    type: String!
    coach: String!
    user: String!
    date: Date
    maxDate: Date
    description: String
    trainingBlocks: [String]
    registryDate: Date
    completed: Boolean!
  }

  input TrainingInput {
    _id: String
    type: String!
    coach: String!
    user: String!
    date: Date
    maxDate: Date
    description: String
    trainingBlocks: [String]
    completed: Boolean!
  }

  type TrainingBlock {
    _id: String!
    coach: String!
    description: String
    distance: Int
    duration: Int
    maxHR: Int
    minHR: Int
    maxSpeed: Float
    minSpeed: Float
    altitude: Float
    result: [TrainingBlockResult]
    schema: Boolean
  }

  input TrainingBlockInput {
    _id: String
    coach: String!
    description: String
    distance: Int
    duration: Int
    maxHR: Int
    minHR: Int
    maxSpeed: Float
    minSpeed: Float
    altitude: Float
    result: [TrainingBlockResultInput]
    schema: Boolean
  }

  type TrainingBlockResult {
    date: Date!
    distance: Float!
    coords: LocationPoint!
    altitude: Float!
    HR: Float!
    course: Float!
    speed: Float!
    gyro: XYZCoords!
    accel: XYZCoords!
    magn: XYZCoords!
  }

  input TrainingBlockResultInput {
    date: Date!
    distance: Float
    coords: LocationPointInput!
    altitude: Float!
    HR: Float!
    course: Float!
    speed: Float!
    gyro: XYZCoordsInput!
    accel: XYZCoordsInput!
    magn: XYZCoordsInput!
  }

  type XYZCoords {
    x: Float!
    y: Float!
    z: Float!
  }

  input XYZCoordsInput {
    x: Float!
    y: Float!
    z: Float!
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
    testLocations: [LocationPoint]#--------------------------
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
    user(email: String!): User
    users: [User]
    plans: [Plan]
    messages(type: MessageType!, to: String!): [Message]
    training(_id: String!): Training
    trainings(user: String, coach: String, completed: Boolean): [Training]
    trainingBlocks(_ids: [String], coach: String): [Training]
  }

  type Mutation {
    user(input: UserInput!): Boolean
    deleteUser(email: String!): Boolean
    updateUser(input: UserInput!): Boolean
    training(input: TrainingInput!): Boolean
    trainingBlock(input: TrainingBlockInput): TrainingBlock
  }
`;

module.exports = typeDefs;
