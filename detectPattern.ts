import { letterCommon } from "./common";

interface RuleFn {
  str: string;
  patterns: string[];
}

const detectPattern = (str: string): string[] => {
  if (!/\.bit$/.test(str)) {
    throw Error("must be a .bit string");
  }
  let [prexfix] = str.split(".");
  let patterns: string[] = [];
  const fns: Array<(str: string, patterns: string[]) => string[]> = [
    (str, patterns) => {
      if (/^(0x)?\d+$/.test(str)) {
        return ["Digit", ...patterns];
      }
      return patterns;
    },
    (str, patterns) => {
      const isHex = str.substring(0, 2) === "0x";
      if (isHex) {
        str = str.substring(2);
      }
      const len = str.length;
      if (len >= 3 && len <= 6 && !isHex) {
        return [`${len}D`, ...patterns];
      }
      return patterns;
    },
    (str, patterns) => {
      const isHex = str.substring(0, 2) === "0x";
      if (isHex) {
        str = str.substring(2);
      }
      const len = str.length;
      if (len === 4) {
        return [`${isHex ? "0x" : ""}10K`, ...patterns];
      }
      if (len === 5) {
        return [`${isHex ? "0x" : ""}100K`, ...patterns];
      }
      return patterns;
    },
    (str, patterns) => {
      const isHex = str.substring(0, 2) === "0x";
      const len = str.length;
      let ptrs = [...patterns];
      if (len >= 3 && len <= 6 && !isHex) {
        let patternStr = "";
        const prexfixSplit = prexfix.split("");
        const haveZero = prexfixSplit.includes("0");
        const pattern = letterCommon(prexfix, "");
        if (pattern) {
          ptrs = [pattern, ...ptrs];
        }
        if (len > 3 && haveZero) {
          for (let i = 0; i < len; i++) {
            const digi = prexfix[i];
            if (digi !== "0") {
              patternStr += "X";
            } else {
              patternStr += "0";
            }
          }
          ptrs = [patternStr, ...ptrs];
        }
      }
      return ptrs;
    },
    (str, patterns) => {
      if (/^[a-zA-Z]+$/.test(str)) {
        const letterPattern = letterCommon(str, "Letter");
        if (letterPattern) {
          return [letterPattern, ...patterns];
        }
      }
      return patterns
    }
  ];

  fns.forEach((fn) => {
    patterns = fn(prexfix, patterns);
  });
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
