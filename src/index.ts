export function HfpBinStringToFloat32 (str: string): number | Error {
  if(str.length !== 32) return Error('Requires a 32 bit binary number')
  let bin: number = parseInt(str, 2)

  const sign: number = bin >>> 31 ? -1 : 1;  
  let exp: number = (bin >>> 24 & 0x7f) - 64;
  
  // mask off the first 8 bits (those aren't used)
  // convert the last 24 bits
  let mantissa:string = (bin & 0xffffff).toString(2)

  // converting from number to string in js loses leading 0s
  // also, this is a decimal, so we have a 24 bit number, but we need 25 bit decimal
  // we pad left until we reach the desired 25 bits
  while (mantissa.length < 25) {
    mantissa = `0`+ mantissa
  }

  let float32: number = 0
  for (let i:number = 0; Math.abs(i) < mantissa.length - 1; i -= 1) {
    float32 += parseInt(mantissa[Math.abs(i)], 2) * Math.pow(2, i)
  }

  return float32 * sign * Math.pow(16, exp);
}