import {catchReq, checkReq, checkUrl} from "../support/utilities"

describe('risk assessment e2e', () => {

    it.only('create a new person risk assessment', () => {

        cy.visit('https://ud-fe.k8stage.ulovdomov.cz/')
        cy.get('[data-test="navbar.hamburgerButton"]')
            .click();
        cy.contains('button', 'Přihlásit se')
            .click();

        cy.get('#email')
            .clear()
            .type('juraj.kapusansky@gmail.com');
        cy.get('[data-test="loginModal.identification.form.button"]')
            .click();

        cy.get('[data-test="loginModal.signIn.form.passwordInput"]', { timeout: 15000 })
            .should('be.visible')
            .clear()
            .type('test123');

        cy.contains('[data-test="loginOption"]', 'Realitní makléř').click();

        cy.get('[data-test="loginModal.signIn.form.button"]')
            .click();
        cy.contains('p', 'Prověření rizikovosti osob')
            .click();
        cy.get('input[name="firstName"]')
            .clear()
            .type('Juraj')
        cy.get('input[name="lastName"]')
            .clear()
            .type('Kapusansky')
        cy.contains('Datum narození')
            .parent()
            .find('input')
            .type('15.03.1992');
        cy.contains('SK registry')
            .parent()
            .find('svg')
            .click();

        cy.get('[name="firstName"]')
            .should('have.value', 'Juraj');

        cy.get('[name="lastName"]')
            .should('have.value', 'Kapusansky');

        cy.contains('Datum narození')
            .parent()
            .find('input')
            .should('have.value', '15.03.1992');

        cy.contains('label', 'SK registry')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        // cy.contains('button', 'Prověřit údaje').click();
        cy.contains('button', 'Základně prověřit zdarma').click();

        cy.contains('button', 'Odemknout ')
        .click({force: true});

        checkUrl("/provereni-rizikovosti-osob/platba");

        cy.get('[data-test="payment.discountCode.button"]').click();
        cy.get('[data-test="paymentMethod.discountCode.input"]').type('TESTOVACIKOD');
        cy.get('[data-test="paymentMethod.discountCode.submit"]').click();
        cy.get('[data-test="alertModal.button"]').click();

        cy.contains('p', '0 Kč').should('have.text', '0 Kč');
        cy.get('[data-test="submitPaymetMethod"]').click();
        cy.contains('button', 'Stáhnout PDF').should('be.visible');
        cy.get('[data-test="alertModal.button"]').click();

        catchReq('GET', '**/pdf/*').as('pdf')
        cy.contains('button', 'Stáhnout PDF').click();
        checkReq('pdf',200)

        cy.verifyDownload('juraj_kapusansky_provereni_rizikovosti.pdf')

    });
});

//pripravit oba testy s pageobject
//check inzeratu
