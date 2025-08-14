import HomePage from '../pages/homePage';
import AddOfferPage from '../pages/addOfferPage';
import {checkUrl, checkReq, catchReq, testStep} from "../support/utilities";

describe('add_offer_e2e', () => {
    it.only('should create a new rent offer for House from reality agent', () => {
        testStep('Visit add-offer start page');
        cy.visit('https://ud-fe.k8stage.ulovdomov.cz/vlozeni-inzeratu/formular/typ-inzerce');
        cy.url().should('include', '/typ-inzerce');

        testStep('Login');
        HomePage.hamburgerButton()
            .click();
        HomePage.loginButton()
            .click();
        HomePage.emailInput()
            .clear()
            .type('juraj.kapusansky@gmail.com');
        HomePage.emailSubmitButton()
            .click();
        HomePage.passwordInput()
            .should('be.visible')
            .clear()
            .type('test123');
        HomePage.passwordSubmitButton()
            .click();

        testStep('Go to add offer');
        HomePage.addOfferButton()
            .click();
        cy.contains('h4', 'Inzerovat sám')
            .should('be.visible')
            .click();
        cy.contains('p', 'Soukromý majitel')
            .should('be.visible')
            .click();

        testStep('Fill contact info');
        AddOfferPage.firstNameInput()
            .clear()
            .type('Juraj')
            .should('have.value', 'Juraj');
        AddOfferPage.lastNameInput()
            .clear()
            .type('Kapusansky')
            .should('have.value', 'Kapusansky');
        AddOfferPage.phonePrefixButton()
            .click();
        cy.contains('.chakra-stack.css-84zodg p', '+421')
            .click({force: true});
        AddOfferPage.phoneInput()
            .clear()
            .type('917863834')
            .should('have.value', '917863834');
        AddOfferPage.nextButton()
            .should('not.be.disabled')
            .click();

        testStep('Select offer type');
        AddOfferPage.rentOption()
            .click()
        AddOfferPage.houseOption()
            .click()
        AddOfferPage.houseTypeSelect()
            .should('be.enabled')
            .find('option[value="villa"]')
            .should('exist');
        AddOfferPage.houseTypeSelect()
            .select('villa')
            .should('have.value', 'villa');
        AddOfferPage.roomOneOption()
            .click().should('contain.text', '1 pokoj');
        AddOfferPage.continueButton()
            .should('not.be.disabled')
            .click();
        checkUrl('/lokalita');

        testStep('Fill address');
        AddOfferPage.townInput()
            .clear().type('Brno{enter}')
            .should('have.value', 'Brno');
        catchReq('GET', '**/address/street-combined-whisper?term=*')
            .as('ulica');
        AddOfferPage.streetInput()
            .clear()
            .type('Bay');
        checkReq('ulica', 200);
        AddOfferPage.streetPopover()
            .find('p')
            .first()
            .should('be.visible')
            .click();
        AddOfferPage.mapBox()
            .should('be.visible');
        AddOfferPage.nextButton()
            .should('not.be.disabled')
            .click();

        testStep('Fill property details');
        checkUrl('/popis');
        AddOfferPage.furnishedOption()
            .click()
        AddOfferPage.usableAreaInput()
            .clear().type('50')
            .should('have.value', '50');
        AddOfferPage.estateAreaInput()
            .clear().type('100')
            .should('have.value', '100');
        AddOfferPage.builtUpAreaInput()
            .clear().type('70')
            .should('have.value', '70');
        AddOfferPage.efficiencySelect()
            .select('b')
            .should('have.value', 'b');
        AddOfferPage.poolCheckbox()
            .click()
        AddOfferPage.nextButton()
            .should('not.be.disabled')
            .click();

        testStep('Fill building details');
        AddOfferPage.floorOption()
            .click()
        AddOfferPage.conditionSelect()
            .select('Velmi dobrý')
            .should('have.value', 'veryGood');
        AddOfferPage.materialSelect()
            .select('Cihlová')
            .should('have.value', 'brick');
        AddOfferPage.locationTypeSelect()
            .select('Centrum obce')
            .should('have.value', 'cityCenter');
        AddOfferPage.surroundingsSelect()
            .select('Obytná')
            .should('have.value', 'residential');
        AddOfferPage.nextButton()
            .should('not.be.disabled')
            .click();

        testStep('Fill description');
        AddOfferPage.additionalDescriptionInput()
            .type('Byt s výhľadom na Vysoke tatry.')
            .invoke('val')
            .should('have.length.greaterThan', 10);
        AddOfferPage.nextButton().should('not.be.disabled')
            .click();

        testStep('Fill price info');
        AddOfferPage.priceInput()
            .clear()
            .type('15000')
            .should('have.value', '15000');
        AddOfferPage.depositInput()
            .clear()
            .type('13000')
            .should('have.value', '13000');
        AddOfferPage.monthlyFeesInput()
            .clear()
            .type('5000').should('have.value', '5000');
        AddOfferPage.noteInput()
            .clear()
            .type('Poznamka')
            .should('have.value', 'Poznamka');
        AddOfferPage.noCommissionOption()
            .click()
        AddOfferPage.immediatelyOption()
            .click()
        AddOfferPage.availableFromInput()
            .first()
            .type('6. 6. 2025')
            .should('have.value', '6. 6. 2025');
        AddOfferPage.availableToInput()
            .last()
            .type('6. 10. 2025')
            .should('have.value', '6. 10. 2025');
        AddOfferPage.nextButton()
            .should('not.be.disabled')
            .click();

        testStep('Upload image');
        AddOfferPage.saveAndContinueButton()
            .should('not.be.disabled')
            .click();
        AddOfferPage.uploadFileInput()
            .first()
            .selectFile('cypress/fixtures/attach.jpg', {force: true})
            .should('have.prop', 'files')
            .its('0.name')
            .should('eq', 'attach.jpg');
        AddOfferPage.saveAndContinueButton()
            .should('not.be.disabled')
            .click();

        testStep('Publish offer with promo code');
        AddOfferPage.standardPlan()
            .click({force: true});
        AddOfferPage.publishButton()
            .should('not.be.disabled')
            .click();
        AddOfferPage.discountButton()
            .should('be.visible')
            .click();
        AddOfferPage.discountInput()
            .type('TESTOVACIKODINZ')
            .should('have.value', 'TESTOVACIKODINZ');
        AddOfferPage.discountSubmit()
            .should('not.be.disabled')
            .click();
        AddOfferPage.modalOkButton()
            .should('be.visible')
            .click();
        AddOfferPage.submitPaymentButton()
            .should('not.be.disabled')
            .click();
        AddOfferPage.modalOkButton()
            .should('be.visible')
            .click();

        testStep('Show new offer');
        AddOfferPage.showOfferButton()
            .first()
            .click();

    });
});

//neviem ako urobit should na zakliknute polia. Malo by top byt nejako cez data checked ale neviem ci cez have value alebo have attr.?
//Nefungovalo mi to nijako
