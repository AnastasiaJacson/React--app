const CheckboxCollection = ({ valueRef, onClick, values, label, htmlIdPrefix, valueProp, labelProp, errorMessage }) => {
  const options = values.map((v, i) => (
    <li key={i}>
      <label htmlFor={`${htmlIdPrefix}-${v[valueProp]}`}>
        <input
          type="checkbox"
          id={`${htmlIdPrefix}-${v[valueProp]}`}
          name={`${htmlIdPrefix}-${v[valueProp]}`}
          value={v[valueProp]}
          defaultChecked={valueRef.includes(+v[valueProp])}
          onClick={onClick} />
        {v[labelProp]}
      </label>
    </li>
  ));

  const error = errorMessage ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>) : (<></>)

  return (
    <div className="mb-6">
      {label}
      <ul>
        {options}
      </ul>
      {error}
    </div>);
};

export default CheckboxCollection;
