class Homepage0 {

    buttonHamburgerMenu() {
        return cy.get('[data-test="navbar.hamburgerButton"]');
    }

    buttonLogin() {
        return cy.contains('button', 'Přihlásit se');
    }

    buttonRegister() {
        return cy.contains('span', 'Registrujte se');
    }

    navigationSection() {
        return cy.get('[data-test="sectionOfContent"]');
    }

    inputEmail() {
        return cy.get('#email');
    }

    buttonEmailContinue() {
        return cy.get('[data-test="loginModal.identification.form.button"]');
    }

    buttonSubmitLogin() {
        return cy.get('[data-test="loginModal.signIn.form.button"]');
    }

    inputRegisterPassword() {
        return cy.get('[data-test="loginModal.signUp.form.input"]');
    }

    inputLoginPassword() {
        return cy.get('[data-test="loginModal.signIn.form.passwordInput"]');
    }

    radioUserType(userType) {
        return cy.contains('[data-test="loginOption"]', userType);
    }

    buttonSubmitRegistration() {
        return cy.get('[data-test="loginModal.signUp.form.button"]');
    }

    buttonTypeOfSearch() {
        return cy.get('[data-test="global.writeBox"]');
    }

    selectTypeOfSearch(typeOfSearch) {
        return cy.contains('p', typeOfSearch);
    }

    buttonAccomodationType(accommodationType) {
        return cy.contains('p', accommodationType);
    }

    inputCitySearch() {
        return cy.get('[data-test="searchAdressInput"]');
    }

    buttonShowAdvertisements() {
        return cy.contains('Zobrazit inzeráty');
    }

    listOfferPreview() {
        return cy.get('[data-test="previewOfferLeases"]');
    }

    inputEmailLogin() {
        return cy.get('#email').clear().type('juraj.kapusansky@gmail.com'));
    }

    buttonMyProfile() {
        return cy.contains('a', 'Můj profil');
    }



    // METODY

    openNavigationMenu() {
        this.buttonHamburgerMenu().click();
        this.buttonLogin().should('be.visible');
        this.buttonRegister().should('be.visible');
        this.navigationSection().should('be.visible').and('have.length.gt', 0);
    }


    login(email, password, userType) {
        this.buttonHamburgerMenu().click();
        this.buttonLogin().click();
        this.inputEmail().clear().type(email);
        this.buttonEmailContinue().click();
        this.radioUserType(userType).click();
        this.inputLoginPassword().type(password);
        this.buttonSubmitLogin().click();
}

    register(email, password, userType) {
        this.openNavigationMenu();
        this.buttonRegister().click();
        this.inputEmail().type(email);
        this.buttonEmailContinue().click();
        this.inputRegisterPassword().type(password);
        this.radioUserType(userType).click();
        this.buttonSubmitRegistration().click();
    }
    search (typeOfSearch, acomodationType, citySearch){
        this.buttonTypeOfSearch().click();
        this.selectTypeOfSearch(typeOfSearch).click();
        this.buttonAccomodationType(acomodationType);
        this.inputCitySearch().type(citySearch)
        //     otazka {brno}
        cy.intercept('POST', '**/v1/offer/find?*').as('findOffer')
        cy.intercept('POST', '**/v1/offer/count').as('countOffer')
        this.buttonShowAdvertisements().click();
        cy.wait('@findOffer').its('response.statusCode').should('eq',200);
        cy.wait('@countOffer').its('response.statusCode').should('eq',200);
    }

    }



    selectPropertyOptions(houseType, flatRoomsNumber,  houseRoomNumber) {
        cy.get('body').then($body => {
            if ($body.find('p:contains("Byt")').length) {
                cy.contains('p', 'Byt').click();
                cy.get('select[name="disposition"]').should('be.visible');
                cy.get('select[name="disposition"]').select(flatRoomsNumber);
            } else if ($body.find('p:contains("Dům")').length) {
                cy.contains('p', 'Dům').click();
                cy.get('select[name="houseType"]').should('be.visible');
                cy.get('select[name="houseType"]').select(houseType);
                cy.contains('p', houseRoomNumber).should('be.visible').click();
            } else {
                throw new Error('Neither Byt nor Dům found on the page');
            }
        });
    }
}

module.exports = new Homepage0();
