import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  getColorClass,
  getFontSizeForHeading,
} from "utils/fontsAndColorsTextAlignment";

export const Details = ({ headTitle, headLevel, headColor, paraBlocks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Heading = `h${headLevel}`;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="p-4 mb-4 transition-all duration-300 ease-in-out rounded-md shadow-xl bg-background sm:p-6">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        <Heading
          dangerouslySetInnerHTML={{ __html: headTitle }}
          className={`transition-colors duration-300 ease-in-out ${
            isOpen ? "text-secondaryDark" : getColorClass(headColor)
          } ${getFontSizeForHeading(headLevel)} flex-grow`}
        />
        <ChevronDownIcon
          className={`ml-2 h-7 w-7 ${isOpen ? "rotate-180 text-secondaryDark" : "rotate-0"} transition-transform duration-300 ease-in-out`}
          style={{ flexShrink: 0 }}
        />
      </div>
      {isOpen &&
        paraBlocks.map((para, index) => (
          <p
            key={index}
            className={`${getColorClass(para.attributes.textColor)} mt-4 transition-all duration-500 ease-in-out`}
            dangerouslySetInnerHTML={{ __html: para.attributes.content }} // Render HTML content directly
          />
        ))}
    </div>
  );
};
