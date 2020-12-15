import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { editlist as stockNoAndNameList } from "../asset/stocklist";
import "./Autosuggest.css";
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  const inputValue = value.toString().trim();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : stockNoAndNameList.filter(
        (stock) =>
          stock.no.toString().slice(0, inputLength) === inputValue ||
          stock.name.includes(inputValue)
      );
};
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.no;
// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => (
  <span>
    {suggestion.no} {suggestion.name}
  </span>
);
export default function MyAutosuggest({
  placeholder,
  onChange,
  name,
  className,
  // value,
}) {
  //------------Auto suggestion related--------------------------------
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onAutoSuggestChange = (_, { newValue }) => {
    // console.log("onAutoSuggestChange", newValue);
    setValue(newValue);
    // setNewRecord({ ...newRecord, stockNo: newValue.toString() });
    onChange(newValue);
  };
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: placeholder,
    value: value,
    onChange: onAutoSuggestChange,
    name: name,
    className: className,
  };
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
