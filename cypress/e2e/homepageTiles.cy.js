describe('parametrisation homepage tiles', () => {
    beforeEach(() => {
        cy.visit('https://ud-fe.k8stage.ulovdomov.cz/');
    });

    it.only('choose useful service for owners property', () => {
        // Tu môžeš mať kód pre tento konkrétny test
    });

    describe('Parametrisation', () => {
        buttons.forEach((item) => {
            it(`Check button: ${item.name}`, () => {
                cy.contains('a', item.name)
                    .should('have.attr', 'href')
                    .click();
                checkUrl(item.href);
            });
        });
    });
});