import { HfpBinStringToFloat, HfpBinToFloat } from '../src';

const positiveBinaryStringFromIbmDocs = "01000010011101101010000000000000"

// binary literals with leading 0 need prefixed by 0b
const positiveBinaryFromIbmDocs = 0b01000010011101101010000000000000
const positiveRealWorldString = "01000010001100010111011011110001"
                
// binary literals with leading 0 need prefixed by 0b
const positiveRealWorldBinary = Buffer.from([0b01000010, 0b00110001, 0b01110110, 11110001])

const negativeBinaryStringFromIbmDocs = "11000010011101101010000000000000"
const negativeBinaryFromIbmDocs = 11000010011101101010000000000000
const negativeRealWorldString = "11000010001100010111011011110001"
const negativeRealWorldBinary = 11000010001100010111011011110001

const testValue = "11000010100001100101111000100100"

describe('Test IBM Hexadecimal Floating Point utils', () => {
  it('should convert positive binary as string, into floating point number', () => {
    // 118.625
    let positiveValue = HfpBinStringToFloat(positiveBinaryStringFromIbmDocs);
    expect(positiveValue).toBe(118.625)

    // real world example
    let realWorldPositive = HfpBinStringToFloat(positiveRealWorldString);
    expect(realWorldPositive).toBe(49.46461486816406)
  })

  it('Should convert positive numbers', () => {
    // -118.625 from ibm docs/wikipedia
    let negativeValue = HfpBinStringToFloat(negativeBinaryStringFromIbmDocs);
    expect(negativeValue).toBe(-118.625)

    let realWorldNegative = HfpBinStringToFloat(negativeRealWorldString);
    expect(realWorldNegative).toBe(-49.46461486816406)
  })

  it('should convert binary as string, into floating point number', () => {
    // -118.625 from ibm docs/wikipedia
    let negativeValue = HfpBinStringToFloat(negativeBinaryStringFromIbmDocs);
    expect(negativeValue).toBe(-118.625)

    // 118.625
    let positiveValue = HfpBinStringToFloat(positiveBinaryStringFromIbmDocs);
    expect(positiveValue).toBe(118.625)

    // real world example
    let realWorldPositive = HfpBinStringToFloat(positiveRealWorldString);
    expect(realWorldPositive).toBe(49.46461486816406)

    let realWorldNegative = HfpBinStringToFloat(negativeRealWorldString);
    expect(realWorldNegative).toBe(-49.46461486816406)
  })

  it('should read test value', () => {
    const buff: Buffer = Buffer.from([
      66,
      49,
      118,
      241
  ])

    console.time('HfpBinStringToFloat')
    const test300 = HfpBinToFloat(buff.readInt32BE())
    console.timeEnd('HfpBinStringToFloat')
    expect(test300).toBe(49.46461486816406)
  })

  it('Should not error on zero', () => {
    const zero = HfpBinToFloat(0)
    expect(zero).toBe(0)

    const nZero = HfpBinToFloat(-0)
    expect(nZero).toBe(0)
  })
})