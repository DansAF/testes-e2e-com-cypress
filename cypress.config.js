
const { defineConfig } = require("cypress");


module.exports = defineConfig({

  projectId: 'y1xh84',

  index: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      baseURL = ("https://notes-serverless-app.com")


    },
  },
});



