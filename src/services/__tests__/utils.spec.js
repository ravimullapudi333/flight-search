import { getDiffInHours, getDiffInMinutes, isDateEqual } from '../utils';

describe('utils', () => {
  describe('isDateEqual', () => {
    it('should return true if dates are equal', () => {
      const isEqual = isDateEqual('2020/11/01', '2020/11/01');
      expect(isEqual).toBe(true);
    });
    it('should return false if dates are equal', () => {
      const isEqual = isDateEqual('2020/11/01', '2020/12/01');
      expect(isEqual).toBe(false);
    });
  });
  describe('getDiffInMinutes', () => {
    it('should return difference of time in minutes', () => {
      const time = getDiffInMinutes('6:00', '5:00');
      expect(time).toBe(60);
    });
  });
  describe('getDiffInHours', () => {
    it('should return difference of time in hours', () => {
      const time = getDiffInHours('6:20', '5:00');
      expect(time).toBe('1h 20m');
    });
  });
});
