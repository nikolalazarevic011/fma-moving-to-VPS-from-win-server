export const getPaddingClass = (padding = "0rem") => {
    const paddingMap = {
      "0rem": "",
      "0.25rem": "p-1",
      "0.5rem": "p-2",
      "0.75rem": "p-3",
      "1rem": "p-4",
      "1.25rem": "p-5",
      "1.5rem": "p-6",
      "2rem": "p-8",
      "2.5rem": "p-10",
      "3rem": "p-12",
      "3.5rem": "p-14",
      "4rem": "p-16",
      "5rem": "p-20",
      "6rem": "p-24",
      "7rem": "p-28",
    };
  
    return paddingMap[padding] || "";
  };
  
  export const getPaddingTopClass = (paddingTop = "0rem") => {
    const paddingTopMap = {
      "0rem": "",
      "0.25rem": "pt-1",
      "0.5rem": "pt-2",
      "0.75rem": "pt-3",
      "1rem": "pt-4",
      "1.25rem": "pt-5",
      "1.5rem": "pt-6",
      "2rem": "pt-8",
      "2.5rem": "pt-10",
      "3rem": "pt-12",
      "3.5rem": "pt-14",
      "4rem": "pt-16",
      "5rem": "pt-20",
      "6rem": "pt-24",
      "7rem": "pt-28",
    };
  
    return paddingTopMap[paddingTop] || "";
  };
  
  export const getPaddingBottomClass = (paddingBottom = "0rem") => {
    const paddingBottomMap = {
      "0rem": "",
      "0.25rem": "pb-1",
      "0.5rem": "pb-2",
      "0.75rem": "pb-3",
      "1rem": "pb-4",
      "1.25rem": "pb-5",
      "1.5rem": "pb-6",
      "2rem": "pb-8",
      "2.5rem": "pb-10",
      "3rem": "pb-12",
      "3.5rem": "pb-14",
      "4rem": "pb-16",
      "5rem": "pb-20",
      "6rem": "pb-24",
      "7rem": "pb-28",
    };
  
    return paddingBottomMap[paddingBottom] || "";
  };
  
  export const getPaddingLeftClass = (paddingLeft = "0rem") => {
    const paddingLeftMap = {
      "0rem": "",
      "0.25rem": "pl-1",
      "0.5rem": "pl-2",
      "0.75rem": "pl-3",
      "1rem": "pl-4",
      "1.25rem": "pl-5",
      "1.5rem": "pl-6",
      "2rem": "pl-8",
      "2.5rem": "pl-10",
      "3rem": "pl-12",
      "3.5rem": "pl-14",
      "4rem": "pl-16",
      "5rem": "pl-20",
      "6rem": "pl-24",
      "7rem": "pl-28",
    };
  
    return paddingLeftMap[paddingLeft] || "";
  };
  
  export const getPaddingRightClass = (paddingRight = "0rem") => {
    const paddingRightMap = {
      "0rem": "",
      "0.25rem": "pr-1",
      "0.5rem": "pr-2",
      "0.75rem": "pr-3",
      "1rem": "pr-4",
      "1.25rem": "pr-5",
      "1.5rem": "pr-6",
      "2rem": "pr-8",
      "2.5rem": "pr-10",
      "3rem": "pr-12",
      "3.5rem": "pr-14",
      "4rem": "pr-16",
      "5rem": "pr-20",
      "6rem": "pr-24",
      "7rem": "pr-28",
    };
  
    return paddingRightMap[paddingRight] || "";
  };
  