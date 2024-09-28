import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SwitchToggle = ({ name, onChange, status }) => {
  return (
    <>
      <div className="relative inline-block">
        <input
          type="checkbox"
          checked={status}
          onChange={onChange}
          name={name}
          className="peer relative w-[3.25rem] h-7 p-px bg-gray-100 border-color4 text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-color3 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-color3 checked:border-color3 focus:checked:border-color3

  before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200"
        />
        <label htmlFor="hs-default-switch-with-icons" className="sr-only">
          switch
        </label>
        <span className="peer-checked:text-white text-gray-500 size-6 absolute top-0.5 start-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
          <FontAwesomeIcon
            className="shrink-0 size-3"
            icon="fa-solid fa-xmark"
          />
        </span>
        <span className="peer-checked:text-0 text-gray-500 size-6 absolute top-0.5 end-0.5 flex justify-center items-center pointer-events-none transition-colors ease-in-out duration-200">
          <FontAwesomeIcon
            className="shrink-0 size-3"
            icon="fa-solid fa-check"
          />
        </span>
      </div>
    </>
  );
};

export default SwitchToggle;
