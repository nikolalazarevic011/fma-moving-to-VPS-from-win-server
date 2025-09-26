// components/ListItem.js
import React from "react";

export const ListItem = ({ content }) => {
  return <li className="py-2" dangerouslySetInnerHTML={{ __html: content }} />;
};


