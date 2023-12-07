import LoginPO from "../pages/login"

describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    LoginPO.isSignInDisabled()

    LoginPO.fillForm({
      email: 'diego.landa.bo@gmail.com',
      password: 'Testing123!'
    })

    LoginPO.pageShouldEqual('http://localhost:3000/')
  })
})