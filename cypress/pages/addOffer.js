import Homepage from "./homepage0";
import {offerRoomNumber, offerTypeOfHouse} from "../fixtures/data";

class AddOffer {

    buttonAddOffer() {
        return cy.get('[data-test="navbar.content.addOffer"]');
    }

    selectTypeOfSearch(typeOfSearch) {
        return cy.contains('p', typeOfSearch);
    }

    selfServiceTile()
    return cy.contains('h4', 'Inzerovat sám');

    radioUserTypeOwner
    return  cy.contains('p', 'Soukromý majitel');

    buttonSelfOffer() {
        return cy.contains('h4', 'Inzerovat sám');
    }

    buttonOfferRoleSelection(offerRole) {
        return cy.contains('p', offerRole);
    }

    inputFirstName() {
        return cy.get('#firstName');
    }

    inputLastName() {
        return cy.get('#lastName');
    }

    inputEmail() {
        return cy.get('#email');
    }

    inputPrefixNumber(prefixNumber) {
        // klik na otvorenie dropdownu
        cy.get('[data-test="global.phoneInput.suggestPrefix"]').click();

        // počkaj, kým sa zobrazí dropdown a klikni na požadovanú hodnotu
        cy.contains('.chakra-stack.css-84zodg p', prefixNumber, {timeout: 5000})
            .click({force: true});
    }

    inputPhoneNumber(phoneNumber) {
    return cy.get('[data-test="offerContact.phone"]');
    }

    buttonSubmitOffer() {
        return cy.contains('button', 'Další');
    }

    radioOfferType(offerType) {
        return cy.contains('p', offerType);
    }
    radioAccommodationType(accommodationType) {
        return cy.contains('p', accommodationType);
    }

    selectDisposition(disposition) {
        cy.get('[data-test="offerForm.disposition"]', disposition).click();
    }

    houseType(){
        return cy.get('[name="houseType"]', houseType);
    }
    roomCount(roomHouse) {
        return cy.contains('p', roomHouse);
    }

    houseType(houseType) {
        return cy.get('[name="houseType"]', houseType);
    }

    // buttonIdealTenantService() {
    //     return cy.contains('h4', 'Chci službu Ideální nájemce');
    // }

    // fillOfferLocation(city, street) {
    //     cy.get('[data-test="offer.address.town.searchInput"]').type(`${city}{enter}`)
    //     cy.get('[data-test="offer.address.street.searchInput"]').type(`${street}{enter}`);
        // cy.get('canvas').should('be.visible');
        // this.buttonSubmitOffer().click();
        // cy.get('input').selectFile('frontend/cypress/fixtures/img/example.json');
// }

        addOffer() {
        this.buttonAddOffer().click();
        this.selfServiceTile().click();
        this.radioUserTypeOwner().click();

        fillUserInfo(firstName, lastName, email, prefixNumber, phoneNumber) {
        this.inputFirstName().should('be.visible').type(firstName);
        this.inputLastName().type(lastName);
        this.inputEmail().type(email);
        this.inputPrefixNumber(prefixNumber);
        this.inputPhoneNumber().type(phoneNumber);
}


//     fillOfferInfo(offertype, accommodationType, houseType, roomHouse, roomFlat)
// {
//         this.radioOfferType(offertype);
//         this.radioAccommodationType(accommodationType);
//
//         if (accommodationType === 'Dům') {
//             this.houseType(houseType);
//             cy.contains('p', roomHouse).click(); // klik na správnu možnosť domu
//         } else {
//             cy.get('[data-test="global.selectBox"]').click(); // otvorí výber
//             cy.contains('p', roomFlat).click();               // klik na izbu pre byt
//     }
// }

    createOffer(accommodationType, disposition, roomCount, city, street) {
        this.fillOfferInfo(accommodationType, disposition, roomCount);
        this.fillOfferLocation(city, street);
        this.selectDisposition(disposition)

        //TO CONTINUE
    }
}

module.exports = new AddOffer();

