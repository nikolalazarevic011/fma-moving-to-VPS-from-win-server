// components/List.js
import { ListItem } from "components/ListItem";
import React from "react";

export const List = ({ items, }) => {
  return (
    <ul className="list-disc pl-8 max-w-7xl mx-auto my-4 text-lg ">
      {items.map((item) =>
        <ListItem key={item.id} content={item.attributes.content} />
      )}
    </ul>
  );
};
