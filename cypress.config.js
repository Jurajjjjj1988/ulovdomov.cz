const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //prvy parameter / namtest pocas vyvoja 2 potom 0
  numTestsKeptInMemory: 2,
  //druhy parameter / watchforfile changes false
  watchForFileChanges: false,
  //treti defualt time out 10000 (10 sek)
  defaultCommandTimeout: 10000,
  //dowmload
  viewportWidth:1920,
  viewportHeight:1080,
  e2e: {
    baseUrl: 'https://ud-fe.k8stage.ulovdomov.cz',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
