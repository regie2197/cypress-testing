/// <reference types="cypress" />

describe('Login Test Suites', () => {
  const loginData = [
      { username: 'standard_user', password: 'secret_sauce', valid: true },
      { username: 'wrong_user', password: 'wrong_password', valid: false }
  ];

  const baseUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
      // Visit the login page before each test
      cy.visit(baseUrl);
  });

  loginData.forEach(({ username, password, valid }, index) => {
      it(`Should ${valid ? 'log in' : 'not log in'} with ${valid ? 'valid' : 'invalid'} credentials (Test case ${index + 1})`, () => {
          const testCaseName = valid ? 'successful_login' : 'unsuccessful_login';

          // Enter username
          cy.get('[data-test="username"]').type(username);

          // Enter password
          cy.get('[data-test="password"]').type(password);

          // Click the login button
          cy.get('[data-test="login-button"]').click();

          // Take a screenshot
          cy.screenshot(`${testCaseName}`);

          if (valid) {
              // Verify successful login by checking the presence of the Swag Labs logo
              cy.get('.app_logo').should('be.visible');
              cy.get('.app_logo').invoke('text').should('include', 'Swag Labs');

              // Logout
              cy.get('#react-burger-menu-btn').click();
              cy.get('#logout_sidebar_link').click();
              cy.url().should('eq', baseUrl);
          } else {
              // Verify error message for invalid login
              cy.get('[data-test="error"]').should('be.visible');
              cy.get('[data-test="error"]').invoke('text').should('include', 'Epic sadface: Username and password do not match any user in this service');
          }
      });
  });
});