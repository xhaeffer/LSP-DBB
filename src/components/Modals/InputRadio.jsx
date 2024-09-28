const InputRadio = ({
  name,
  title,
  hidden,
  value,
  inputChange,
  placeholder,
  checked,
}) => {
  return (
    <>
      <label
        htmlFor={`hs-${value}-form`}
        className="max-w-xs flex p-3 my-2 w-full bg-white border border-color4 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <input
          type="radio"
          name={name}
          value={value}
          onChange={inputChange}
          checked={checked}
          className="shrink-0 mt-0.5 border-gray-200 rounded-full text-color3 focus:ring-color3 checked:bg-color3 disabled:opacity-50 disabled:pointer-events-none"
          id={`hs-${value}-form`}
        />
        <span className="text-sm text-gray-500 ms-3">{placeholder}</span>
      </label>
    </>
  );
};

export default InputRadio;
