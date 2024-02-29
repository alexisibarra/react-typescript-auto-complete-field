import React, { useState, useEffect, FC, useCallback } from "react";
import { Option } from "../Types/Option";
import "./Styles/AutocompleteFieldFour.css";
import { AutocompleteFieldDropdown } from "./Components/AutocompleteFieldDropdown";
import { useLanguages } from "../ContactForm/Utils/useLanguages";

type Props = {
  onSelect: (option: Option | undefined) => void;
};

export const AutocompleteField: FC<Props> = (props) => {
  const { onSelect: handleOnSelect } = props;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    isLoading,
    options: filteredOptions,
    error,
  } = useLanguages(searchTerm);

  const onSelect = useCallback(
    (selectedOption: Option) => {
      setSearchTerm(selectedOption.label);
      handleOnSelect(selectedOption);
    },
    [handleOnSelect]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showDropdown || !filteredOptions) return;

      if (event.key === "ArrowDown") {
        setSelectedIndex(
          Math.min(selectedIndex + 1, filteredOptions.length - 1)
        );
        return;
      }

      if (event.key === "ArrowUp") {
        setSelectedIndex(Math.max(selectedIndex - 1, 0));
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        onSelect(filteredOptions[selectedIndex]);
        setShowDropdown(false);
        return;
      }

      if (event.key === "Escape") {
        setShowDropdown(false);

        return;
      }

      return;
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showDropdown, selectedIndex, onSelect, filteredOptions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleOnClose = () => {
    handleOnSelect(undefined);
    setShowDropdown(false);
  };

  const handleListItemClick = (index: number) => {
    if (filteredOptions) {
      onSelect(filteredOptions[index]);
      setShowDropdown(false);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="preferred-programming-Language">Preferred Language</label>

      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
        className="input-field"
      />

      {showDropdown && (
        <AutocompleteFieldDropdown
          isLoading={isLoading}
          filteredOptions={filteredOptions}
          searchTerm={searchTerm}
          handleOnClose={handleOnClose}
          selectedIndex={selectedIndex}
          handleListItemClick={handleListItemClick}
          error={error}
        />
      )}
    </div>
  );
};
