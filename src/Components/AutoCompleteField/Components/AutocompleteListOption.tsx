import React, { FC } from "react";
import { Option } from "../../Types/Option";

type Props = {
  option: Option;
  searchTerm?: string;
  selectedIndex: number;
  index: number;
  handleListItemClick: (index: number) => void;
};

export const AutocompleteListOption: FC<Props> = (props) => {
  const { option, searchTerm, selectedIndex, index, handleListItemClick } =
    props;

  const highlightedLabel = option.label.replace(
    new RegExp(`(${searchTerm})`, "gi"),
    `<span class="highlight">$1</span>`
  );

  return (
    <li
      key={option.label}
      onClick={() => {
        handleListItemClick(index);
      }}
      className={selectedIndex === index ? "active" : ""}
    >
      <span dangerouslySetInnerHTML={{ __html: highlightedLabel }} />
    </li>
  );
};
