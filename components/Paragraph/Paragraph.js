import { getTextAlign } from "utils/fontsAndColorsTextAlignment";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";
import { useIsMobile } from "utils/useIsMobile";

export const Paragraph = ({ textAlign = "left", content, textColor }) => {
  const isMobile = useIsMobile();

  const textAlignClass = !isMobile ? getTextAlign(textAlign) : "text-center";

  return (
    <p
      className={`mx-auto my-3 max-w-7xl font-light ${textAlignClass}`}
      style={{ color: textColor }}
      dangerouslySetInnerHTML={{
        __html: relativeToAbsoluteUrls(content),
      }}
    />
  );
};
