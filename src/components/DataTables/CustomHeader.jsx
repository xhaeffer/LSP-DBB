import { Button } from "flowbite-react";

const CustomHeader = ({ title, description, onButtonClick, buttonText, hideButton }) => {
  return (
    <div className="flex items-center justify-between mb-4 p-4 border-b border-gray-200 bg-gray-50">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{description}</p>
      </div>

      <Button
        className={ hideButton ? "hidden" : "bg-cyan-700 text-white shadow hover:bg-color2 focus:ring-1 focus:ring-bg-color3"}
        onClick={() => onButtonClick()}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default CustomHeader;
