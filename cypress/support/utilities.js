export function createEmail() {
    return `test+${Math.floor(Math.random() * 10000)}@gmail.com`;
}

export function openPage(url) {
    cy.visit(url);
}

export function testStep(nameStep) {
    cy.step(nameStep);
}

export function checkUrl (url) {
    cy.url().should('contain', url);
}

export function catchReq(method, url) {
    return cy.intercept(method, url);
}

export function checkReq(alias, statusCode) {
    return cy.wait(`@${alias}`).its('response.statusCode').should('eq', statusCode);
}