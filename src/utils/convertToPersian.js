export default function convertToPersianNumber(latinNum) {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return latinNum.toString().replace(/\d/g, (digit) => persianDigits[digit])
}
