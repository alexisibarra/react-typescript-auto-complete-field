import React, { FC } from "react";
import { Option } from "../../Types/Option";
import { AutocompleteListOption } from "./AutocompleteListOption";

type Props = {
  isLoading: boolean;
  filteredOptions: Option[] | undefined;
  searchTerm: string | undefined;
  handleOnClose: () => void;
  selectedIndex: number;
  handleListItemClick: (index: number) => void;
  error: Error | undefined;
};

export const AutocompleteFieldDropdown: FC<Props> = (props) => {
  const {
    isLoading,
    filteredOptions,
    searchTerm,
    error,
    handleOnClose,
    selectedIndex,
    handleListItemClick,
  } = props;

  if (isLoading) {
    return (
      <ul className="autocomplete-list short">
        <li>Loading...</li>
      </ul>
    );
  }

  if (error && searchTerm && searchTerm.length > 0) {
    return (
      <ul className="autocomplete-list short">
        <li>There was an error. Please try again.</li>
      </ul>
    );
  }

  if (filteredOptions?.length === 0 && searchTerm && searchTerm.length > 0) {
    return (
      <ul className="autocomplete-list short">
        <li>No results</li>
      </ul>
    );
  }

  if (filteredOptions && filteredOptions.length > 0) {
    return (
      <>
        <span className="close-button" onClick={handleOnClose}>
          X
        </span>

        <ul className="autocomplete-list">
          {filteredOptions.map((option, index) => (
            <AutocompleteListOption
              key={`AutocompleteListOption-${index}-${option.label}`}
              option={option}
              searchTerm={searchTerm}
              selectedIndex={selectedIndex}
              index={index}
              handleListItemClick={handleListItemClick}
            />
          ))}
        </ul>
      </>
    );
  }

  return <></>;
};
