{
  user(id: "1") {
    firstName
    company {
      ...companyDetails
    }
  }
  company2: company(id: "1") {
    ...companyDetails
    users {
      firstName
    }
  }
  company1: company(id: "1") {
    ...companyDetails
    users {
      firstName
    }
  }
}

fragment companyDetails on company {
  id
  name
  description
}
