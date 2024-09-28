import { Menu, Transition } from "@headlessui/react";
import { Button } from "flowbite-react";
import { Fragment } from "react";

const ActionsMenu = ({ onEdit, onDelete, hidden }) => (
  <Menu as="div" className="relative">
    <Menu.Button className="p-2 font-bold text-gray-500 hover:text-gray-700"> ⋮ </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items className="absolute right-7 bottom-0 w-32 origin-top-right z-10 bg-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-2 ring-color4 ring-opacity-5 focus:outline-none px-1 py-1">
        <div className="p-1">
          <Menu.Item>
            {({ active }) => (
              <>
                <Button
                  size="xs"
                  className={`${
                    active
                    ? "text-white"
                    : ""
                  } group flex justify-start w-full text-sm mb-1`}
                  onClick={() => onEdit()}
                >
                  Edit
                </Button>
              </>
            )}
          </Menu.Item>
          <Menu.Item className={hidden}>
            {({ active }) => (
              <Button
                size="xs"
                onClick={onDelete}
                className={`${
                  active
                    ? "text-white"
                    : ""
                } group flex justify-start w-full text-sm`}
              >
                Delete
              </Button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default ActionsMenu;
