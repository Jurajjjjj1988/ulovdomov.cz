//import 'cypress-file-upload';
import {checkUrl, checkReq, catchReq}
from "../support/utilities";

describe('add_offer_e2e', () => {

    it.only('should create a new rent offer for House from reality agent', () => {

        cy.visit('https://ud-fe.k8stage.ulovdomov.cz/vlozeni-inzeratu/formular/typ-inzerce')
        cy.get('[data-test="navbar.hamburgerButton"]').click();
        cy.contains('button', 'Přihlásit se').click();

        cy.get('#email').clear().type('juraj.kapusansky@gmail.com');
        cy.get('[data-test="loginModal.identification.form.button"]').click();


        cy.get('[data-test="loginModal.signIn.form.passwordInput"]', { timeout: 15000 })
            .should('be.visible')
            .clear()
            .type('test123');

        cy.get('[data-test="loginModal.signIn.form.button"]').click();


        cy.get('[data-test="navbar.content.addOffer"]').click();

        cy.contains('h4', 'Inzerovat sám').click();
        cy.contains('p', 'Soukromý majitel').click();

        cy.get('#firstName').clear().type('Juraj');
        cy.get('#lastName').clear().type('Kapusansky');

        cy.get('[data-test="global.phoneInput.suggestPrefix"]').click();
        cy.contains('.chakra-stack.css-84zodg p', '+420', {timeout: 5000}).click({force: true});
        cy.get('[data-test="offerContact.phone"]').clear().type('917863834');

        cy.contains('button', 'Další').click();

        cy.contains('p', 'Pronájem').click();
        cy.contains('p', 'Dům').click();
        cy.get('[name="houseType"]').select('villa');
        cy.contains('label', '1 pokoj').click();

        cy.contains('label', 'Dům')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.contains('label', 'Pronájem')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.get('[name="houseType"]')
            .should('have.value', 'villa');

        cy.contains('button', 'Pokračovat').click();

        // cy.intercept('GET', '**/vlozeni-inzeratu/formular/lokalita*').as('lokalita');
        // cy.wait('@lokalita').its('response.statusCode').should('eq', 200);

        // catchReq('GET', '**/vlozeni-inzeratu/formular/lokalita*').as('lokalita')
        // checkReq('lokalita', '200')

        checkUrl('/lokalita');


        cy.get('[data-test="offer.address.town.searchInput"]').clear().type(`Brno{enter}`)
        catchReq('GET', '**/address/street-combined-whisper?term=*').as('ulica')
        cy.get('[data-test="offer.address.street.searchInput"]').clear().type(`Bay`);

        checkReq('ulica',200);
        cy.get('[data-test="offer.address.street.popover"]')
            .find('p')
            .first()
            .click();

        cy.get('#newoffer-mapbox').should('be.visible');
        cy.contains('button', 'Další').click();
        checkUrl('/popis');


        cy.contains('p', 'Nezařízené').click();
        cy.get('input[name="usableArea"]').clear().type('50');
        cy.get('input[name="estateArea"]').clear().type('100');
        cy.get('input[name="builtUpArea"]').clear().type('70');
        cy.contains('div','Bazén');
        cy.get('select[name="efficiency"]').select('b');


        cy.contains('label', 'Nezařízené')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.get('[name="usableArea"]')
            .should('have.value', '50');

        cy.get('[name="estateArea"]')
            .should('have.value', '100');

        cy.get('[name="builtUpArea"]')
            .should('have.value', '70');

        cy.contains('div', 'Bazén')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.contains('button', 'Další').click();


        cy.get('label').contains('Přízemní').click();
        cy.get('select[name="condition"]').select('Velmi dobrý');
        cy.get('select[name="material"]').select('Cihlová');

        cy.contains('p','Samostatný').click();
        cy.get('select[name="locationType"]').select('Centrum obce');
        cy.get('select[name="surroundings"]').select('Obytná');
        cy.contains('p','Ochranné pásmo').click();

        cy.contains('label', 'Přízemní')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.get('[name="condition"] option:selected')
            .should('have.text', 'Velmi dobrý');

        cy.get('[name="material"] option:selected')
            .should('have.text', 'Cihlová');

        cy.contains('label', 'Samostatný')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.get('[name="locationType"] option:selected')
            .should('have.text', 'Centrum obce');

        cy.get('[name="surroundings"] option:selected')
            .should('have.text', 'Obytná');

        cy.contains('label', 'Ochranné pásmo')
            .invoke('attr', 'data-checked')
            .should('not.be.null');

        cy.contains('button', 'Další').click();

        cy.get('[data-test="global.textarea"]')
            .should('be.visible')
            .type('Byt s výhľadom na Vysoke tatry.')
            .invoke('val')
            .should('have.length.greaterThan', 10);

        cy.contains('button', 'Další').click();

        cy.get('input[name="price"]').clear().type('15000')
        cy.get('input[name="depositPrice"]').clear().type('13000')
        cy.contains('p','bez provize').click();
        cy.get('input[name="monthlyFeesPrice"]').clear().type('5000')
        cy.get('input[name="descriptionPrice"]').clear().type('Poznamka')
        cy.contains('p','Ihned').click();

        cy.get('[data-test="global.writeBox"] input[placeholder]')
            .first()
            .type('6. 6. 2025')
            .should('have.value', '6. 6. 2025');

        cy.get('[data-test="global.writeBox"] input.chakra-input')
            .last()
            .type('6. 10. 2025')
            .should('have.value', '6. 10. 2025');

    cy.get('[name="price"]')
        .should('have.value', '15000');
    cy.get('[name="depositPrice"]')
        .should('have.value', '13000');


    cy.contains('label', 'bez provize')
        .invoke('attr', 'data-checked')
        .should('not.be.null');

    cy.get('[name="monthlyFeesPrice"]')
        .should('have.value', '5000');

    cy.contains('label', 'Ihned')
        .invoke('attr', 'data-checked')
        .should('not.be.null');


        cy.contains('button', 'Další').click();

        cy.contains('button', 'Uložit a pokračovat').click();



        cy.get('input[type=file]').selectFile('cypress/fixtures/attach.jpg')

        cy.contains('button', 'Uložit a pokračovat').click();

        cy.get('[value="STANDARD"]').click({force: true});
        cy.contains('a','Zveřejnit').click();

        cy.get('[data-test="payment.discountCode.button"]').click()
        cy.get('[data-test="paymentMethod.discountCode.input"]').type('TESTOVACIKODINZ');
        cy.get('[data-test="paymentMethod.discountCode.submit"]').click();
        cy.get('[data-test="alertModal.button"]').click();
        cy.get('[data-test="submitPaymetMethod"]').click();
        cy.get('[data-test="alertModal.button"]').click();
    });
});

        // dokoncit inzerat na kontrolu obsahu cez moje inzeraty
        // test zmazania inzeratu

    // it('should create a new sell offer for flat from private owner', () => {
    //
    //     cy.visit('https://ulovdomov.cz')
    //     cy.get('[data-test="navbar.hamburgerButton"]').click();
    //     cy.contains('button', 'Přihlásit se').click();
    //
    //     cy.get('#email').clear().type('juraj.kapusansky@gmail.com');
    //     cy.get('[data-test="loginModal.identification.form.button"]').click();
    //
    //     //cy.contains('[data-test="loginOption"]', 'Realitní makléř').click();
    //
    //     cy.get('[data-test="loginModal.signIn.form.passwordInput"]', { timeout: 15000 })
    //         .should('be.visible')
    //         .clear()
    //         .type('test123');
    //
    //     cy.get('[data-test="loginModal.signIn.form.button"]').click();
    //
    //
    //     cy.get('[data-test="navbar.content.addOffer"]').click();
    //
    //     cy.contains('h4', 'Inzerovat sám').click();
    //     cy.contains('p', 'Soukromý majitel').click();
    //
    //     cy.get('#firstName').clear().type('Juraj');
    //     cy.get('#lastName').clear().type('Kapusansky');
    //     //cy.get('#email').clear().type('juraj.kapusansky@gmail.com');
    //     cy.get('[data-test="global.phoneInput.suggestPrefix"]').click();
    //     cy.contains('.chakra-stack.css-84zodg p', '+420', {timeout: 5000}).click({force: true});
    //     cy.get('[data-test="offerContact.phone"]').clear().type('917863834');
    //
    //     cy.contains('button', 'Další').click();
    //
    //     cy.contains('p', 'Prodej').click();
    //     cy.contains('p', 'Byt').click();
    //     cy.get('select[name="disposition"]').select('3+1');
    //     cy.contains('button', 'Pokračovat').click();
    //
    //     cy.get('[data-test="offer.address.town.searchInput"]').clear().type(`Brno{enter}`)
    //     cy.get('[data-test="offer.address.street.searchInput"]').clear().type(`Bayerova{enter}`);
    //
    //     cy.contains('p', 'Nezařízené').click();
    //     cy.get('input[name="usableArea"]').clear().type('55');
    //     cy.get('input[name="floorNumber"]').clear().type('3');
    //     cy.get('input[name="totalFloors"]').clear().type('5');
    //     cy.contains('div','Terasa');
    //     cy.contains('div','Zahrada');
    //     cy.get('select[name="efficiency"]').select('b');
    //     cy.contains('button', 'Další').click();
    //
    //     cy.contains('p','Osobní').click();
    //     cy.get('select[name="condition"]').select('veryGood');
    //     cy.get('select[name="material"]').select('brick');
    //     cy.contains('p','Loft').click();
    //     cy.get('select[name="locationType"]').select('outskirts');
    //     cy.get('select[name="surroundings"]').select('residential');
    //     cy.contains('button', 'Další').click();
    //
    //     cy.get('textarea[name="description"]').clear().type('Dom s výhľadom na Vysoke tatry.')
    //     cy.contains('button', 'Další').click();
    //
    //     cy.get('input[name="price"]').clear().type('15000')
    //     cy.get('input[name="depositPrice"]').clear().type('15000')
    //     cy.contains('p','bez provize').click();
    //     cy.get('input[name="depositPrice"]').clear().type('15000')
    //     cy.get('input[name="descriptionPrice"]').clear().type('15000')
    //     cy.contains('p','Ihned').click();
    //
    //     cy.get('[data-test="global.writeBox"] input[placeholder]')
    //         .clear()
    //         .first()
    //         .type('6. 6. 2025');
    //
    //     cy.get('[data-test="global.writeBox"] input.chakra-input')
    //         .clear()
    //         .last()
    //         .type('6. 10. 2025');
    //     cy.contains('button', 'Další').click();
    //     cy.contains('button', 'Uložit a pokračovat').click();
    //
    //     //cy.get('input[type="file"]').attachFile('attach.jpg');
    //     cy.contains('button', 'Uložit a pokračovat').click();
    //
    //     cy.get('[value="STANDARD"]').click({force: true});
    //     cy.contains('a','Zveřejnit').click();