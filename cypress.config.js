// const { defineConfig } = require("cypress");
// const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
// const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
// const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

// module.exports = defineConfig({
//   e2e: {
//     async setupNodeEvents(on, config) {
//       const bundler = createBundler({
//         plugins: [createEsbuildPlugin(config)],
//       });

//       on("file:preprocessor", bundler);
//       await addCucumberPreprocessorPlugin(on, config);

//       return config;
//     },
//     specPattern: "cypress/e2e/**/*.feature",
//     stepDefinitions: "cypress/support/**/*.{js,mjs,ts,tsx}", // Ensure this matches your step definitions path
//    // stepDefinitions: "cypress/support/**/*.{js,mjs,ts,tsx}",
//   },
// });

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');





module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      // Add event to handle Excel reading/writing
      on('task', {
        readExcel({ fileName }) {
          const filePath = path.join(__dirname, `../fixtures/${fileName}`);
          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          return xlsx.utils.sheet_to_json(worksheet);
        },
        writeExcel({ fileName, newValue }) {
          const filePath = path.join(__dirname, `../fixtures/${fileName}`);
          const workbook = xlsx.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          worksheet['A1'].v = newValue; // Modify A1 cell
          xlsx.writeFile(workbook, filePath);
          return null; // No return value needed
        },
      });

      return config;
    },
    specPattern: "cypress/e2e/**/*.feature",
    stepDefinitions: "cypress/support/**/*.{js,mjs,ts,tsx}",
  },
});
