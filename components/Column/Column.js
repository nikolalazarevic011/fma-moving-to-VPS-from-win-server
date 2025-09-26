import React from "react";
import PropTypes from "prop-types";
import {
  getBorderColorClass,
  getBorderBottomWidthClass,
  getBorderRadiusClass,
} from "utils/border";
import { useIsMobile } from "utils/useIsMobile";

export const Column = ({
  children,
  width,
  textColor,
  backgroundColor,
  borderBottom,
  borderBottomColor,
  minHeight,
  shadow,
  borderRadius,
  isHidden,
}) => {
  const isMobile = useIsMobile();
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  const widthStyle = width
    ? { width: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };
  const minHeightStyle = !isMobile && minHeight ? { minHeight } : {};
  
  if (isHidden) return null;

  return (
    <div
      style={{
        ...widthStyle,
        ...textColorStyle,
        ...backgroundColorStyle,
        ...minHeightStyle,
      }}
      className={`col px-2 py-2 sm:py-2 ${getBorderBottomWidthClass(borderBottom)} ${getBorderColorClass(borderBottomColor)} ${getBorderRadiusClass(borderRadius)} `}
    >
      {children}
    </div>
  );
};

Column.propTypes = {
  // children: PropTypes.node.isRequired,
  width: PropTypes.string,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderBottom: PropTypes.string,
  borderBottomColor: PropTypes.string,
  isHidden: PropTypes.bool,
};
