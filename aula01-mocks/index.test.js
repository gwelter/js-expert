const { rejects, deepStrictEqual } = require('assert');

const { error } = require('./src/constants');
const File = require('./src/file');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/header-invalid.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "id": 123,
        "name": "Guilherme Welter",
        "profession": "Javascript Student",
        "birthDay": new Date().getFullYear() - 29
      },
      {
        "id": 321,
        "name": "Xuxa da Silva",
        "profession": "Javascript Specialist",
        "birthDay": new Date().getFullYear() - 80
      },
      {
        "id": 231,
        "name": "Joaozinho",
        "profession": "Java Developer",
        "birthDay": new Date().getFullYear() - 30
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})();