import React, { useEffect, useRef } from "react";

//Iframe usage
export const AcfCustomHtml = ({ customHtml }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current.querySelector("iframe");
      if (iframe) {
        iframe.onload = () => {
          console.log("Iframe is loaded and should be visible now.");
          // If you need to perform any action after the iframe loads
        };
      }
    }
  }, []);

  return (
    <div
      ref={iframeRef}
      className="overflow-auto rounded-lg shadow-lg"
      style={{ minHeight: "500px" }}
    >
      <div dangerouslySetInnerHTML={{ __html: customHtml }} />
    </div>
  );
};
