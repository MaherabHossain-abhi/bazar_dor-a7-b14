export const banglaNumber = (number: number) => {
  return number.toLocaleString("bn-BD");
};

export const unitBn: Record<string, string> = {
  kg: 'কেজি',
  g: 'গ্রাম',
  litre: 'লিটার',
  l: 'লিটার',
  dozen: 'ডজন',
  piece: 'পিস',
  pcs: 'পিস',
  hali: 'হালি',
};

export const toBnUnit = (unit: string) =>
  unitBn[unit.toLowerCase()] ?? unit;