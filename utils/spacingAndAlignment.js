export const getSpacingClass = (value, type = "margin", direction = "") => {
  const typeMap = {
    margin: "m",
    padding: "p",
  };

  const directionMap = {
    top: "t",
    right: "r",
    bottom: "b",
    left: "l",
    x: "x",
    y: "y",
  };

  const baseClass = typeMap[type] || typeMap["margin"];
  const dirClass = directionMap[direction] || "";

  return `${baseClass}${dirClass}-${[value]}`;
};

//! radi ali samo sa brojevima, npr 20 a ne 20rem
// Example usage
// console.log(getSpacingClass("-2.5rem", "margin", "top")); // Outputs: m-t-[-2.5rem]
// console.log(getSpacingClass("1.5rem", "padding", "x")); // Outputs: p-x-[1.5rem]

export const getAlignmentClass = (value = "center") => {
  const alightMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    bottom: "align-bottom",
    top: "align-top",
    middle: "align-middle",
  };

  return `${alightMap[value] || ""}`;
};

//radi za ubuduce da znas ako treva
export const getMarginTopClass = (marginTop) => {
  const marginMap = {
    "-3rem": "-mt-20", // ovako ako pasujes rem za vrednost
    4: "mt-4",
    8: "mt-8",
    "2rem": "mt-8",
    10: "mt-40",
    20: "mt-20",
  };
  // Directly return a class name constructed from the marginTop value
  // return `mt-[${marginTop}]`;
  return `${marginMap[marginTop] || ""}`;
};

export const getMarginBottomClass = (marginBottom) => {
  const marginMap = {
    "-5": "-mb-5", // if passing  - rem value
    "-2": "-mb-8",
    "-1": "-mb-2",
    "0rem": "", // No margin
    "0.25rem": "mb-1", // 4px
    "0.5rem": "mb-2", // 8px
    "0.75rem": "mb-3", // 12px
    "1rem": "mb-4", // 16px
    "1.25rem": "mb-5", // 20px
    "1.5rem": "mb-6", // 24px
    "2rem": "mb-8", // 32px
    "2.5rem": "mb-10", // 40px
    "3rem": "mb-12", // 48px
    "4rem": "mb-16", // 64px
    "5rem": "mb-20", // 80px
    "6rem": "mb-24", // 96px
    "8rem": "mb-32", // 128px
    "10rem": "mb-40", // 160px
    "12rem": "mb-48", // 192px
    "14rem": "mb-56", // 224px
    "16rem": "mb-64", // 256px
    // Add more as needed
  };

  return `${marginMap[marginBottom] || ""}`;
};

export const getHorizontalGapStyle = (blockGap) => {
  if (!blockGap || typeof blockGap !== "string") return {};

  // "var:preset|spacing|40" → extract number if pattern matches
  const match = blockGap.match(/var:preset\|spacing\|(\d+)/);
  if (match) {
    const spacingValue = match[1];
    return { gap: `${spacingValue}px` }; // or `columnGap` if more precise
  }

  // fallback if it's a raw value like "2rem" or "20px"
  if (blockGap.endsWith("rem") || blockGap.endsWith("px")) {
    return { gap: blockGap };
  }
  return {};
};

export const getVerticalGapStyle = (gapValue) => {
  if (!gapValue || typeof gapValue !== "string") return {};

  // Match pattern like var:preset|spacing|40 → "40" (could also be rem/px)
  const match = gapValue.match(/var:preset\|spacing\|(\d+)/);
  if (match) {
    return { rowGap: `${match[1]}px` };
  }

  // Raw value like "2rem" or "20px"
  if (gapValue.endsWith("rem") || gapValue.endsWith("px")) {
    return { rowGap: gapValue };
  }

  return {};
};

