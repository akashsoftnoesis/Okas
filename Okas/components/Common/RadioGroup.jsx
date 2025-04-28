import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const RadioGroup = ({ name, options, onChange, defaultValue, flex = false }) => {

  const [radioData, setRadioData] = useState([])

  useEffect(() => {
    if (defaultValue) {
      const newOptions = options.map(item => {
        const valueOfCheck = defaultValue === "true" ? true : false
        return {
          ...item,
          checked: item.value === valueOfCheck
        }
      })
      setRadioData(newOptions);
    } else {
      setRadioData(options);
    }
  }, [defaultValue, options])

  return (
    <div className={flex ? `d-flex flex-wrap radio-space` : `d-flex`}>
      {radioData?.map(({ label: optionLabel, value, checked }, index) => {
        return (
          <div key={index} className={flex ? `pr-3 radio-column d-flex` : `pr-3 radio-column`}>
            <input
              id={index + name}
              name={name}
              type="radio"
              value={value}
              defaultChecked={checked}
              onChange={onChange}
              className={flex ? `mr-1 mt-1` : ``}
            />{" "}
            <label htmlFor={index + name}>
              <span>{optionLabel}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
    })
  ),
};
export default RadioGroup;
