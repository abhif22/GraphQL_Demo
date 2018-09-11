{
  user(id: "1") {
    firstName
    company {
      id
      name
      description
    }
  }
  company2: company(id: "1") {
    id
    name
    description
    users {
      firstName
    }
  }
  company1: company(id: "1") {
    id
    name
    description
    users {
      firstName
    }
  }
}