export const getBorderWidthClass = (borderWidth = "0px") => {
  const borderWidthMap = {
    "0px": "",
    "1px": "border-1",
    "2px": "border-2",
    "4px": "border-4",
    "8px": "border-8",
    "12px": "border-12",
    "16px": "border-16",
  };

  return borderWidthMap[borderWidth] || "";
};

export const getBorderTopWidthClass = (borderTopWidth = "0px") => {
  const borderTopWidthMap = {
    "0px": "",
    "1px": "border-t-1",
    "2px": "border-t-2",
    "4px": "border-t-4",
    "8px": "border-t-8",
    "12px": "border-t-12",
    "16px": "border-t-16",
  };

  return `${borderTopWidthMap[borderTopWidth] || ""}`;
};

export const getBorderLeftWidthClass = (borderLeftWidth = "0px") => {
  const borderLeftWidthMap = {
    "0px": "",
    "1px": "border-l-1",
    "2px": "border-l-2",
    "4px": "border-l-4",
    "8px": "border-l-8",
    "12px": "border-l-12",
    "16px": "border-l-16",
  };

  return `${borderLeftWidthMap[borderLeftWidth] || ""}`;
};

export const getBorderRightWidthClass = (borderRightWidth = "0px") => {
  const borderRightWidthMap = {
    "0px": "",
    "1px": "border-r-1",
    "2px": "border-r-2",
    "4px": "border-r-4",
    "8px": "border-r-8",
    "12px": "border-r-12",
    "16px": "border-r-16",
  };

  return `${borderRightWidthMap[borderRightWidth] || ""}`;
};
export const getBorderBottomWidthClass = (borderBottomWidth = "0px") => {
  const borderBottomWidthMap = {
    "0px": "",
    "1px": "border-b-1",
    "2px": "border-b-2",
    "4px": "border-b-4",
    "8px": "border-b-8",
    "12px": "border-b-12",
    "16px": "border-b-16",
  };

  return `${borderBottomWidthMap[borderBottomWidth] || ""}`;
};

export const getBorderColorClass = (color = "primary") => {
  const colorMap = {
    primary: "border-primary",
    secondary: "border-secondary",
    primaryLight: "border-primaryLight",
    primaryDark: "border-primaryDark",
    white: "border-white",
    black: "border-black",
    headingRed: "border-headingRed",
    headingOrange: "border-headingOrange",
    "var:preset|color|background": "border-white",
    "var:preset|color|primary": "border-primary",
    "var:preset|color|secondary": "border-secondary",
    "var:preset|color|menuHighlightBlue": "border-menuHighlightBlue",
  };

  return `${colorMap[color] || ""}`;
};

export const getBorderRadiusClass = (radius) => {
  const borderRadiusMap = {
    'none': 'rounded-none',
    'sm': 'rounded-sm',
    '5px': 'rounded-md',
    '6px': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    'full': 'rounded-full',
    'large': 'rounded-large', // Custom class, make sure it's defined in Tailwind config
  };

  return `${borderRadiusMap[radius] || 'rounded-default'}`;
};

