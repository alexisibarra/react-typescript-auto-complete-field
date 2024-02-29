import React, { useState } from "react";
import { Option } from "../Types/Option";
import { AutocompleteField } from "../AutoCompleteField/AutocompleteField";
import "./Styles/ContactForm.css";

export const ContactForm = () => {
  const [firstName, setFirstName] = useState("Alexis");
  const [lastName, setLastName] = useState("Ibarra");
  const [preferredLanguageOption, setPreferredLanguageOption] =
    useState<Option>();

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (preferredLanguageOption) {
      alert(
        `${firstName} ${lastName} prefers ${preferredLanguageOption.label}`
      );
    }
  };

  return (
    <div className="contact-form">
      <h1>We want to know about you</h1>

      <p>
        Please, let us know who you are and what's your preferred language so we
        can tailor the information we provided to you
      </p>

      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First name:</label>

          <input
            className="input-field"
            type="text"
            id="fname"
            name="fname"
            disabled
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last name:</label>

          <input
            className="input-field"
            type="text"
            id="lname"
            name="lname"
            disabled
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>

        <AutocompleteField onSelect={setPreferredLanguageOption} />

        <input className="input-field submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};
