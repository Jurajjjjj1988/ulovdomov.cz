class AddOfferPage {

    inzerovatSamButton() {
        return cy.contains('h4', 'Inzerovat sám');
    }

    soukromyMajitelButton() {
        return cy.contains('p', 'Soukromý majitel');
    }

    firstNameInput() {
        return cy.get('#firstName');
    }

    lastNameInput() {
        return cy.get('#lastName');
    }

    phonePrefixButton() {
        return cy.get('[data-test="global.phoneInput.suggestPrefix"]');
    }

    phoneInput() {
        return cy.get('[data-test="offerContact.phone"]');
    }

    nextButton() {
        return cy.contains('button', 'Další');
    }

    rentOption() {
        return cy.contains('p', 'Pronájem');
    }

    houseOption() {
        return cy.contains('p', 'Dům');
    }

    houseTypeSelect() {
        return cy.get('[name="houseType"]');
    }

    roomOneOption() {
        return cy.contains('p', '1 pokoj');
    }
    continueButton() {
        return cy.contains('button', 'Pokračovat');
    }

    townInput() {
        return cy.get('[data-test="offer.address.town.searchInput"]');
    }

    streetInput() {
        return cy.get('[data-test="offer.address.street.searchInput"]');
    }

    streetPopover() {
        return cy.get('[data-test="offer.address.street.popover"]');
    }

    mapBox() {
        return cy.get('#newoffer-mapbox');
    }

    furnishedOption() {
        return cy.contains('p', 'Nezařízené');
    }

    usableAreaInput() {
        return cy.get('input[name="usableArea"]');
    }

    estateAreaInput() {
        return cy.get('input[name="estateArea"]');
    }

    builtUpAreaInput() {
        return cy.get('input[name="builtUpArea"]');
    }

    efficiencySelect() {
        return cy.get('select[name="efficiency"]');
    }

    poolCheckbox() {
        return cy.contains('div', 'Bazén');
    }

    floorOption() {
        return cy.get('label').contains('Přízemní');
    }

    conditionSelect() {
        return cy.get('select[name="condition"]');
    }

    materialSelect() {
        return cy.get('select[name="material"]');
    }

    locationTypeSelect() {
        return cy.get('select[name="locationType"]');
    }

    surroundingsSelect() {
        return cy.get('select[name="surroundings"]');
    }

    additionalDescriptionInput() {
        return cy.get('[data-test="global.textarea"]');
    }

    priceInput() {
        return cy.get('input[name="price"]');
    }

    depositInput() {
        return cy.get('input[name="depositPrice"]');
    }

    monthlyFeesInput() {
        return cy.get('input[name="monthlyFeesPrice"]');
    }

    noteInput() {
        return cy.get('input[name="descriptionPrice"]');
    }

    noCommissionOption() {
        return cy.contains('p', 'bez provize');
    }

    immediatelyOption() {
        return cy.contains('p', 'Ihned');
    }

    availableFromInput() {
        return cy.get('[data-test="global.writeBox"] input[placeholder]')
    }

    availableToInput() {
        return cy.get('[data-test="global.writeBox"] input.chakra-input')
    }

    uploadFileInput() {
        return cy.get('input[type=file]');
    }

    saveAndContinueButton() {
        return cy.contains('button', 'Uložit a pokračovat');
    }

    standardPlan() {
        return cy.get('[value="STANDARD"]');
    }

    publishButton() {
        return cy.contains('a', 'Zveřejnit');
    }

    discountButton() {
        return cy.get('[data-test="payment.discountCode.button"]');
    }

    discountInput() {
        return cy.get('[data-test="paymentMethod.discountCode.input"]');
    }

    discountSubmit() {
        return cy.get('[data-test="paymentMethod.discountCode.submit"]');
    }

    modalOkButton() {
        return cy.get('[data-test="alertModal.button"]');
    }

    submitPaymentButton() {
        return cy.get('[data-test="submitPaymetMethod"]');
    }

    showOfferButton() {
        return cy.get('a[data-test="myOffers.showOfferButton"]');
    }
}

export default new AddOfferPage();
