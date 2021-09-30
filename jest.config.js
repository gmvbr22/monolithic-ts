/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: tsjPreset.transform
}
