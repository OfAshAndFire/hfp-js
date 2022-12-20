export function HfpBinStringToFloat (str: string): number | Error {
  if(str.length !== 32) return Error('Requires a 32 bit binary number')
  let bin: number = parseInt(str, 2) | 0;
  
  let exp: number = -1;
  let mantissa: number = bin & 0xffffff;
  // protect against zeros
  if (mantissa == 0) return bin < 0 ? -0 : 0;
  while (mantissa < 0x800000) {
    mantissa <<= 1; exp--;
  }
  exp += 4 * (((bin >> 24) & 0x7f) - 64);
  const sign: number = bin & 0x80000000
  const f1: number = sign | ((exp + 1023) << 20) | ((mantissa & ~0x800000) >> 3);
  const f0: number = (mantissa & ~0x800000) << 29;
  return new Float64Array(new Int32Array([f0, f1]).buffer)[0];
}

export function HfpBinToFloat (bin: number): number | Error {
  let exp: number = -1;
  let mantissa: number = bin & 0xffffff;
  // protect against zeros
  if (mantissa == 0) return bin < 0 ? -0 : 0;
  while (mantissa < 0x800000) {
    mantissa <<= 1; exp--;
  }
  exp += 4 * (((bin >> 24) & 0x7f) - 64);
  const sign: number = bin & 0x80000000
  const f1: number = sign | ((exp + 1023) << 20) | ((mantissa & ~0x800000) >> 3);
  const f0: number = (mantissa & ~0x800000) << 29;
  return new Float64Array(new Int32Array([f0, f1]).buffer)[0];
}