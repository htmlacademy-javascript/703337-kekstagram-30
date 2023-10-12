function checkLengthString (str, maxLength){
  if(str.length <= maxLength){
    return true;
  }
  return false;
}
checkLengthString('Hello, world!', 10);

function checkPalindrom (str){
  const normalizeString = str.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for(let i = normalizeString.length - 1; i >= 0; i--){
    newString += normalizeString[i];
  }
  return (normalizeString === newString);
}

