import { useIsMobile } from "utils/useIsMobile";
import {
  getAlignmentClass,
  getHorizontalGapStyle,
  getMarginTopClass,
  getVerticalGapStyle,
} from "utils/spacingAndAlignment";
import {
  getBorderColorClass,
  getBorderRadiusClass,
  getBorderWidthClass,
} from "utils/border";

export const Columns = ({
  isStackedOnMobile,
  children,
  textColor,
  backgroundColor,
  marginTop,
  marginBottom,
  verticalAlignment,
  borderWidth, //didn't work last time, try without for now
  borderRadius,
  borderColor,
  minHeight,
  horizontalGap,
  verticalGap,
}) => {
  const isMobile = useIsMobile();
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  const marginTopClass =  marginTop ? { marginTop } : "";
  // const marginTopClass = { marginTop } ;
  const marginBottomClass = !isMobile && marginBottom ? { marginBottom } : "";
  const minHeightStyle = minHeight ? { minHeight } : {};
  const horizontalGapStyle = getHorizontalGapStyle(horizontalGap); // Get the block gap style
  // const verticalGapStyle = getVerticalGapStyle(verticalGap);

  return (
    <div
      style={{
        ...textColorStyle,
        ...backgroundColorStyle,
        ...marginTopClass,
        ...marginBottomClass,
        ...minHeightStyle,
        position: "relative",
      }}
    >
      <div
        className={`cols mx-auto max-w-6xl ${getBorderRadiusClass(borderRadius)} ${
          isStackedOnMobile ? "flex flex-col md:flex-row justify-center items-center" : "flex justify-center items-center"
        } ${verticalAlignment ? getAlignmentClass(verticalAlignment) : ""} ${!isMobile && getBorderWidthClass(borderWidth)} ${getBorderColorClass(borderColor)} `}
        // style={{ ...horizontalGapStyle, ...verticalGapStyle }}
        style={{ ...horizontalGapStyle }}
      >
        {children}
      </div>
    </div>
  );
};
