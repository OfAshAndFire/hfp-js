import { HfpBinStringToFloat32 } from '../src';

const positiveBinaryStringFromIbmDocs = "01000010011101101010000000000000"
const positiveRealWorldString =         "01000010001100010111011011110001"

const negativeBinaryStringFromIbmDocs = "11000010011101101010000000000000"
const negativeRealWorldString = "11000010001100010111011011110001"
describe('Test IBM Hexadecimal Floating Point utils', () => {
  it('should convert positive binary as string, into floating point number', () => {
    // 118.625
    let positiveValue = HfpBinStringToFloat32(positiveBinaryStringFromIbmDocs);
    expect(positiveValue).toBe(118.625)

    // real world example
    let realWorldPositive = HfpBinStringToFloat32(positiveRealWorldString);
    expect(realWorldPositive).toBe(49.464599609375)
  })

  it('Should convert positive numbers', () => {
    // -118.625 from ibm docs/wikipedia
    let negativeValue = HfpBinStringToFloat32(negativeBinaryStringFromIbmDocs);
    expect(negativeValue).toBe(-118.625)
    
    let realWorldNegative = HfpBinStringToFloat32(negativeRealWorldString);
    expect(realWorldNegative).toBe(-49.464599609375)
  })

  it('should convert binary as string, into floating point number', () => {
    // -118.625 from ibm docs/wikipedia
    let negativeValue = HfpBinStringToFloat32(negativeBinaryStringFromIbmDocs);
    expect(negativeValue).toBe(-118.625)

    // 118.625
    let positiveValue = HfpBinStringToFloat32(positiveBinaryStringFromIbmDocs);
    expect(positiveValue).toBe(118.625)

    // real world example
    let realWorldPositive = HfpBinStringToFloat32(positiveRealWorldString);
    expect(realWorldPositive).toBe(49.464599609375)

    let realWorldNegative = HfpBinStringToFloat32(negativeRealWorldString);
    expect(realWorldNegative).toBe(-49.464599609375)
  })

})