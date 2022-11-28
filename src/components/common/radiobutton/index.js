const Radiobutton = ({ valueRef, onChange, htmlIdPrefix, values, valueProp, labelProp, errorMessage }) => {
  const radio = values.map((v, i) => (
    <label htmlFor={`${htmlIdPrefix}-${v[valueProp]}`} key={i}>
      <input
        type="radio"
        id={`${htmlIdPrefix}-${v[valueProp]}`}
        value={v[valueProp]}
        defaultChecked={valueRef === v[valueProp]}
        name={htmlIdPrefix} />
      {v[labelProp]}
    </label>
  ));

  return (
    <div className="mb-6" onChange={e => onChange(e.target.value)}>
      {radio}
    </div>
  );
};

export default Radiobutton;
