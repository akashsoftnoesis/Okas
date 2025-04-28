import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RenderSelect = (props) => {
  const {
    field: {
      onChange,
    },
    data,
    onChangeHandle,
    defaultValue,
    disabled
  } = props;


  const [selectedOption, setSelectedOption] = useState({
    value: null
  });

  useEffect(() => {
    const dataCopy = data.slice();
    const selectedValue = dataCopy.find(item => item.value === defaultValue);
    selectedValue && setSelectedOption(selectedValue);
  }, [data, defaultValue]);

  const handleChange = (e) => {
    onChange(e.value);
    onChangeHandle && onChangeHandle(e.value);
    setSelectedOption(e);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={data}
      isSearchable={false}
      isDisabled={disabled}
    />
  );
};
RenderSelect.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  field: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    onChange: PropTypes.func.isRequired,
  }),
};

RenderSelect.defaultProps = {
  field: { onChange: () => { }, onChangeHandle: () => { }, value: '', defaultValue: '' },
};

export default RenderSelect;