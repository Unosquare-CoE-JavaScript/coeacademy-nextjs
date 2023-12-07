class LoginPage {
  elements ={
    loginBtn : () => cy.get('[data-testid=btnLoginSubmit]'),
    email : () => cy.get('[data-testid=txtEmail]'),
    password : () => cy.get('[data-testid=txtPassword]'),
  }
  
  isSignInDisabled() {
    this.elements.loginBtn().should('be.disabled')
  }

  clickOnSignin(){
    this.elements.loginBtn().click()
  }

  fillForm(loginData: {email: string, password: string}) {
    this.elements.email().type(loginData.email)
    this.elements.password().type(loginData.password)

    this.clickOnSignin()
  }

  pageShouldEqual(url: string) {
    cy.url().should('eql', url)
  }
}
    
export default new LoginPage()
