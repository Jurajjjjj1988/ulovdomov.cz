import {
    createEmail,
    checkUrl
} from '../support/utilities'
import Homepage from '../pages/homePage'
import AddOffer from '../pages/addOfferPage'
import {
    openPage
} from "../support/utilities";
import {scenarios} from "../fixtures/loginScenarios";
import {
    offerContact,
    offerRoomNumber,
    offerType,
    offerTypeOfHouse,
    offerTypeOfProperty,
    loginOptions, offerRole
} from "../fixtures/data"


const {username, password} = Cypress.env('adminUserKliro');

describe('template spec', () => {
    beforeEach(() => {
        cy.session('loginUser', () => {
            openPage('/');
            Homepage.login('juraj.kapusansky@gmail.com', 'test123', 'Realitní makléř');
        });
        openPage('/');
    });




    // it('check search', () => {
    //     Homepage.buttonTypeOfSearch().click();
    //     Homepage.selectTypeOfSearch('Prodej').click();
    //     Homepage.buttonAccomodationType('Byt').click();
    //     Homepage.inputCitySearch().type('Brno{enter}');
    //     cy.intercept('POST', '**/v1/offer/find?*').as('findOffer')
    //     cy.intercept('POST', '**/v1/offer/count').as('countOffer')
    //     Homepage.buttonShowAdvertisements().click();
    //     cy.wait('@findOffer').its('response.statusCode').should('eq',200);
    //     cy.wait('@countOffer').its('response.statusCode').should('eq',200);
    //     Homepage.listOfferPreview().should('be.visible');
    // });

    it('check search and detail', () => {
        Homepage.search('Pronájem', 'Dům', 'Brno')
        Homepage.listOfferPreview().first().click();
        cy.get('img').should('be.visible');
    });

    it('user registration', () => {
        Homepage.register('juraj423324@gmail.com', 'test123', 'Soukromý majitel')
    });

    it('change profile information', () => {
        Homepage.login('juraj.kapusansky@gmail.com', 'test123', 'Soukromý majitel');
        Homepage.buttonHamburgerMenu().click();
        Homepage.buttonRegister().click();
    });

    it.only('e2e_create new offer', () => {

Homepage.login('juraj.kapusansky@gmaiol.com', 'test123', 'Realitní makléř');
AddOffer.addOffer().click();

        AddOffer.click();
        cy.get('#firstName').clear().type('Juraj');
        cy.get('#lastName').clear().type('Kapusansky');
        cy.get('#email').clear().type('juraj.kapusansky@gmail.com');
        cy.get('[data-test="global.phoneInput.suggestPrefix"]').click();
        cy.contains('.chakra-stack.css-84zodg p', '+420', {timeout: 5000}).click({force: true});
        cy.get('[data-test="offerContact.phone"]').clear().type('917863834');

        cy.contains('button', 'Další').click();

        cy.contains('[data-test="loginOption"]', 'Realitní makléř').click();
        cy.get('[data-test="loginModal.signIn.form.passwordInput"]').type('test123');
        cy.get('[data-test="loginModal.signIn.form.button"]').click();

        cy.contains('p', 'Pronájem').click();
        cy.contains('p', 'Byt').click();
        cy.get('select[name="disposition"]').select('3+1');
        cy.contains('button', 'Pokračovat').click();

        cy.get('[data-test="offer.address.town.searchInput"]').clear().type(`Brno{enter}`)
        cy.get('[data-test="offer.address.street.searchInput"]').clear().type(`Bayerova{enter}`);

        cy.contains('p', 'Nezařízené').click();
        cy.get('input[name="usableArea"]').clear().type('55');
        cy.get('input[name="floorNumber"]').clear().type('3');
        cy.get('input[name="totalFloors"]').clear().type('5');
        cy.contains('div','Terasa')
        cy.contains('div','Zahrada')
        cy.get('select[name="efficiency"]').select('b');
        cy.contains('button', 'Další').click();

        cy.contains('p','Osobní').click();
        cy.get('select[name="condition"]').select('veryGood');
        cy.get('select[name="material"]').select('brick');
        cy.contains('p','Loft').click();
        cy.get('select[name="locationType"]').select('outskirts');
        cy.get('select[name="surroundings"]').select('residential');
        cy.contains('button', 'Další').click();

        cy.get('textarea[name="description"]').clear().type('Byt s výhľadom na Vysoke tatry.')
        cy.contains('button', 'Další').click();

        cy.get('input[name="price"]').clear().type('15000')
        cy.get('input[name="depositPrice"]').clear().type('15000')
        cy.contains('p','bez provize').click();
        cy.get('input[name="depositPrice"]').clear().type('15000')
        cy.get('input[name="descriptionPrice"]').clear().type('15000')
        cy.contains('p','Ihned').click();

        cy.get('[data-test="global.writeBox"] input[placeholder]')
            .clear()
            .type('6. 6. 2025');

        cy.get('[data-test="global.writeBox"] input.chakra-input')
            .clear()
            .type('6. 10. 2025');
        cy.contains('button', 'Další').click();
        cy.contains('button', 'Uložit a pokračovat').click();

        cy.get('input[type="file"]').attachFile('attach.jpg');
        cy.contains('button', 'Uložit a pokračovat').click();

        cy.contains('label.chakra-radio', 'Premium').click();
        cy.contains('a','Zveřejnit').click();


        // import 'cypress-file-upload';
        // cy.get('canvas.maplibregl-canvas').should('be.visible');

        // cy.get('[name="houseType"]', houseType);
        // cy.contains('p', roomHouse);
        // cy.get('[name="houseType"]', houseType);
        //
        // AddOffer.fillOfferInfo('Prodej', 'Dom', 'Vila', '2 pokoje', '1+kk')
        // AddOffer.fillOfferLocation('Brno', 'Prazska');


    });

});

// urobit novu strukturu testov podla funkcionality, aby davali zmysel
// login kontrola request 200+500
// login kontrola selectButton nema byt
// zacat pageObjectom, potom pouzit v teste
// + prekopat pagobject podla stranok
//predaj bytu a premnajom domu
//rozdelit na citatelnejsie
// skontrolovat ze tam nie je modal pri logine
// nastudovat teoriu e2e test



/*1.inicializacna faza / vytvaranie premennycg
2 setup face / priprava dat / system under test
3.exekucna faza /databaza / spustenie testov
4.tear down / upratat po sebe*/