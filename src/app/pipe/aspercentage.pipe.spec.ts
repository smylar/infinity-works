import { AspercentagePipe } from './aspercentage.pipe';

describe('AspercentagePipe', () => {
  it('create an instance', () => {
    const pipe = new AspercentagePipe();
    expect(pipe).toBeTruthy();
  });
  
  it('calculates a percentage', () => {
      const pipe = new AspercentagePipe();
      expect(pipe.transform(1,2)).toBe(50);
      expect(pipe.transform(0.1,20)).toBe(0.5);
    });
  
  it('returns 0 on divide by 0', () => {
      const pipe = new AspercentagePipe();
      expect(pipe.transform(1,0)).toBe(0);
    });
});
