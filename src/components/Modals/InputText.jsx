const InputText = ({
  name,
  title,
  hidden,
  type,
  value,
  inputChange,
  placeholder,
}) => {
  return (
    <div className="col-span-5">
      <label
        htmlFor={`hs-${name}`}
        className="block text-md font-medium mb-2 dark:text-color4"
      >
        {title} <span className={`${hidden} italic text-red-500`}>*</span>
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={inputChange}
          className="py-3 px-4 block w-full border-color-3 shadow-sm rounded-lg text-sm focus:z-10 focus:border-color-2  disabled:opacity-50 disabled:pointer-events-none dark:bg-color-6 dark:text-gray-400 dark:focus:ring-color-2"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputText;
