function checkLengthString (str, maxLength){
  return (str.length <= maxLength);
}

function checkPalindrom (str){
  const normalizeString = str.replaceAll(' ', '').toUpperCase();
  const newString = normalizeString.split('').reverse().join('');
  return (normalizeString === newString);
}
