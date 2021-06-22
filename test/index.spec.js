const { getDecimal, getHR } = require('../server/commands');
const { exampleExam, exampleTwo, exampleTen } = require('../server/constants');

describe('Serial', () => {
  describe('Transform', () => {
    it('Binary to Decimal', () => {
      expect(getDecimal('1101')).toEqual(13);
      expect(getDecimal('11110001')).toEqual(241);
      expect(getDecimal('11111111')).toEqual(255);
      expect(getDecimal(exampleExam)).toEqual(341);
      expect(getDecimal(exampleTwo)).toEqual(127);
    });
  })

  describe('HR Response', () => {
    it('Response %', () => {
      expect(Math.round(getHR(exampleTwo))).toEqual(50)
      expect(parseInt(getHR(exampleTen))).toEqual(10)
    })
  })
})
