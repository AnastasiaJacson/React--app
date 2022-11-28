const Dropdown = ({ valueRef, onChange, values, valueProp, labelProp, htmlId, label, errorMessage }) => {
  const options = values.map((v, i) => (
    <option key={i} value={v[valueProp]}>
      {v[labelProp]}
    </option>
  ));

  const error = errorMessage ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>) : (<></>)

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor={htmlId}>{label}</label>
      <select id={htmlId} value={valueRef} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {options}
      </select>
      {error}
    </div>
  );
};

export default Dropdown;
