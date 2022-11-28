const digiLetter = ["A", "B", "C", "D"];

export const letterCommon = (inputStr: string, initStr: string): string => {
  let temp: { [k: string]: string } = {};
  let patternStr = initStr;
  let pointer = 0;
  const len = inputStr.length;
  for (let i = 0; i < len; i++) {
    const digi = inputStr[i];
    if (digi in temp) {
      patternStr += temp[digi];
    } else {
      temp[digi] = digiLetter[pointer];
      patternStr += temp[digi];
      pointer++;
    }
  }
  if (pointer > 4) {
    return "";
  }
  return patternStr;
};
