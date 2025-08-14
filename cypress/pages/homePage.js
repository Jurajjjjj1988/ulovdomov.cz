class HomePage {
    hamburgerButton() {
        return cy.get('[data-test="navbar.hamburgerButton"]');
    }

    loginButton() {
        return cy.contains('button', 'Přihlásit se');
    }

    emailInput() {
        return cy.get('#email');
    }

    emailSubmitButton() {
        return cy.get('[data-test="loginModal.identification.form.button"]');
    }

    passwordInput() {
        return cy.get('[data-test="loginModal.signIn.form.passwordInput"]');
    }

    passwordSubmitButton() {
        return cy.get('[data-test="loginModal.signIn.form.button"]');
    }

    addOfferButton() {
        return cy.get('[data-test="navbar.content.addOffer"]');
    }
}

export default new HomePage();
