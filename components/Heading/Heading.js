import React from "react";
import {
  getColorClass,
  getFontSizeForHeading,
  getTextAlign,
} from "utils/fontsAndColorsTextAlignment";
import { getMarginBottomClass } from "utils/spacingAndAlignment";
import { useIsMobile } from "utils/useIsMobile";
import { useRouter } from "next/router";

export const Heading = ({
  textAlign,
  content,
  level = 2,
  color,
  marginBottom,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  // Get the dynamic path from the router query
  const pathComponents = router.query.slug || [];
  const fullPath = `/${pathComponents.join("/")}`;
  const normalizedPath = fullPath.replace(/\/$/, ""); // Normalize the path to ignore trailing slashes

  // Check if the URL path is /members/tools-resources
  const isSpecialPage = normalizedPath === "/members/tools-resources";

  const textAlignClass = !isMobile ? getTextAlign(textAlign) : "text-center";
  const headingStyle = isSpecialPage ? { minHeight: "52px" } : {};

  const Component = `h${level}`; // Correctly define the heading level

  return (
    <Component
      dangerouslySetInnerHTML={{ __html: content }}
      className={`my-1 font-heading sm:mx-1 ${!isMobile && marginBottom ? getMarginBottomClass(marginBottom) : "sm:my-5"} ${getFontSizeForHeading(level, isMobile)} ${textAlignClass} ${getColorClass(color)}`}
      style={headingStyle}
    />
  );
};
