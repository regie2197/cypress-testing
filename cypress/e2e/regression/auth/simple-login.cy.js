/// <reference types="cypress" />

describe('Simple Login Tests', () => {
    const baseUrl = 'https://www.saucedemo.com/';
  
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit(baseUrl);
    });
  
    it('Should log in with valid credentials', () => {
      // Enter valid username and password
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
  
      // Click the login button
      cy.get('[data-test="login-button"]').click();
  
      // Verify successful login by checking the presence of the Swag Labs logo
      cy.get('.app_logo').should('be.visible');
  
      // Logout
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('eq', baseUrl);
    });
  
    it('Should not log in with invalid credentials', () => {
      // Enter invalid username and password
      cy.get('[data-test="username"]').type('wrong_user');
      cy.get('[data-test="password"]').type('wrong_password');
  
      // Click the login button
      cy.get('[data-test="login-button"]').click();
  
      // Verify error message is displayed
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').invoke('text').should('include', 'Epic sadface: Username and password do not match any user in this service');
    });
  });