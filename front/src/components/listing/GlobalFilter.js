import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)


  return (
    <input
      className="searchbar"
      value={value || ""}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Filter your URLs by keyword`}
    />
  )
}

export default GlobalFilter;
