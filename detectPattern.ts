const digiLetter = ["A", "B", "C", "D"];

const letterCommon = (inputStr: string, initStr: string): string => {
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
const detectPattern = (str: string): string[] => {
  if (!/\.bit$/.test(str)) {
    throw Error("must be a .bit string");
  }
  let [prexfix] = str.split(".");
  let patterns: string[] = [];
  if (/^(0x)?\d+$/.test(prexfix)) {
    patterns.unshift("Digit");
    const isHex = prexfix.substring(0, 2) === "0x";
    if (isHex) {
      prexfix = prexfix.substring(2);
    }
    const len = prexfix.length;
    if (len >= 3 && len <= 6 && !isHex) {
      patterns.unshift(`${len}D`);
    }
    if (len === 4) {
      patterns.unshift(`${isHex ? "0x" : ""}10K`);
    }
    if (len === 5) {
      patterns.unshift(`${isHex ? "0x" : ""}100K`);
    }
    if (len >= 3 && len <= 6 && !isHex) {
      let patternStr = "";
      const prexfixSplit = prexfix.split("");
      const haveZero = prexfixSplit.includes("0");
      const pattern = letterCommon(prexfix, "");
      pattern && patterns.unshift(pattern);
      if (len > 3 && haveZero) {
        for (let i = 0; i < len; i++) {
          const digi = prexfix[i];
          if (digi !== "0") {
            patternStr += "X";
          } else {
            patternStr += "0";
          }
        }
        patterns.unshift(patternStr);
      }
    }
  }
  if (/^[a-zA-Z]+$/.test(prexfix)) {
    const letterPattern = letterCommon(prexfix, "Letter");
    letterPattern && patterns.unshift(letterPattern);
  }

  console.log(patterns);
  return patterns;
};

detectPattern("333.bit");
detectPattern("2112.bit");
detectPattern("45555.bit");
detectPattern("888000.bit");
detectPattern("8880000.bit");

detectPattern("0098.bit");
detectPattern("0x9832.bit");
detectPattern("DDD.bit");
detectPattern("DID.bit");
