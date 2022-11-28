import './style.css';

const TextInput = ({ valueRef, onChange, label, placeholder, htmlId, errorMessage }) => {
  const error = errorMessage ? (<p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>) : (<></>)

  return (
    <div className="mb-6">
      <label htmlFor={htmlId} className={`input-label ${errorMessage ? 'invalid' : ''}`}>{label}</label>
      <input value={valueRef} onChange={onChange} type="text" id={htmlId} className={`text-input ${errorMessage ? 'invalid' : ''}`} placeholder={placeholder} />
      {error}
    </div>
  )
};

export default TextInput;
