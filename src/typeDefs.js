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

  enum PlanType {
    PREMIUM
    STANDAR
    BASIC
  }

  type JWT {
    error: String
    token: String
    type: UserType
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
    trainingBlocks: [TrainingBlock!]!
    registryDate: Date
    lastModified: Date!
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
    trainingBlocks: [String!]!
    completed: Boolean
  }

  type TrainingBlock {
    _id: String!
    coach: String!
    title: String
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
    title: String
    distance: Int
    duration: Int
    maxHR: Int
    minHR: Int
    maxSpeed: Float
    minSpeed: Float
    altitude: Float
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
    accel: XYZCoords!
  }

  input TrainingBlockResultInput {
    date: Date!
    distance: Float
    coords: LocationPointInput!
    altitude: Float!
    HR: Float!
    course: Float!
    speed: Float!
    accel: XYZCoordsInput!
  }

  input TrainingResultInput {
    _id: String!
    result: [TrainingBlockResultInput!]!
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
    from: String!
    to: String!
    date: Date!
    subject: String!
    body: String!
  }

  type MessageInput {
    from: String!
    to: String!
    date: Date!
    subject: String!
    body: String!
  }

  type Plan {
    _id: String!
    coach: String!
    type: PlanType!
    monthlyPrice: Float!
    lastModified: Date!
    registryDate: Date!
    testLocations: [LocationPoint]#--------------------------
  }

  input PlanInput {
    _id: String
    coach: String!
    type: PlanType!
    monthlyPrice: Float!
  }

  type PlanSubscription {
    plan: String!
    dueDate: Date!
  }

  input PlanSubscriptionInput {
    plan: String!
    dueDate: Date!
  }

  interface UserInterface {
    _id: String!
    type: UserType!
    password: String!
    name: String!
    lastName: String!
    birthday: Date!
    district: String!
    province: String!
    email: String!
    phoneNumber: String
    gender: Gender!
    registryDate: Date
    photo: String #-------------------------
  }

  type Coach implements UserInterface {
    _id: String!
    type: UserType!
    password: String!
    name: String!
    lastName: String!
    birthday: Date!
    district: String!
    province: String!
    email: String!
    phoneNumber: String
    gender: Gender!
    registryDate: Date
    photo: String #-------------------------
    fields: [String!]!
  }

  type User implements UserInterface {
    _id: String!
    type: UserType!
    password: String!
    name: String!
    lastName: String!
    birthday: Date!
    district: String!
    province: String!
    email: String!
    phoneNumber: String
    gender: Gender!
    registryDate: Date
    photo: String #-------------------------
    weight: Float!
    height: Float!
    diseases: String
    allergies: String
    surgeries: String
    plan: PlanSubscription
    testResults: [String] #------------
  }

  input UserInput {
    type: UserType!
    password: String!
    name: String!
    lastName: String!
    birthday: Date!
    district: String!
    province: String!
    email: String!
    phoneNumber: String
    gender: Gender!
    weight: Float
    height: Float
    diseases: String
    allergies: String
    surgeries: String
    photo: String
    activityClass: Int
    fields: [String]
  }

  input UpdateUserInput {
    type: UserType
    password: String
    name: String
    lastName: String
    birthday: Date
    district: String
    province: String
    email: String!
    phoneNumber: String
    gender: Gender
    weight: Float
    height: Float
    diseases: String
    allergies: String
    surgeries: String
    plan: PlanSubscriptionInput
    photo: String
    activityClass: Int
    fields: [String]
  }

  type Query {
    token(email: String!, password: String!): JWT
    user(email: String!): UserInterface
    users(coach: String): [UserInterface]
    coaches(fields: [String], province: String, search: String): [Coach]
    plans(coach: String): [Plan]
    plan(_id: String!): Plan
    messages(from: String, to: String): [Message]
    training(_id: String!): Training
    trainings(user: String, coach: String, completed: Boolean, since: Date, month: Date): [Training]
    trainingBlocks(_ids: [String], coach: String, schema: Boolean): [TrainingBlock]
  }

  type Mutation {
    user(input: UserInput!): UserInterface
    deleteUser(email: String!): Boolean
    updateUser(input: UpdateUserInput!): UserInterface
    training(input: TrainingInput!): Training
    deleteTraining(_id: String!): Boolean
    deleteTrainingBlocks(_ids: [String!]!): Boolean
    trainingBlock(input: TrainingBlockInput): TrainingBlock
    trainingResult(input: [TrainingResultInput!]!): Boolean
    plan(input: PlanInput): Plan
    message(input: MessageInput!): Message
  }
`;

module.exports = typeDefs;
