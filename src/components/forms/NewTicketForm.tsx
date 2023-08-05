"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useRef, useState } from "react";
import { classNames } from "@/lib/utils";
import TicketContentEditor from "@/components/forms/partials/TicketContentEditor";

interface NewTicketFormProps {
  users: {
    id: String;
    name: String;
  }[];
  createNewTicket: Function;
}

const noAssignee = {
  id: -1,
  name: "No default assignee",
};

export default function NewTicketForm(props: NewTicketFormProps) {
  const [content, setContent] = useState("");
  const [selectedUser, setSelectedUser] = useState(noAssignee);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (titleRef.current) {
      props.createNewTicket({
        title: titleRef.current.value,
        assignee: selectedUser,
        content: content,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-full md:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600">
                  <input
                    type="text"
                    name="title"
                    ref={titleRef}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-full md:col-span-3">
              <Listbox value={selectedUser} onChange={setSelectedUser}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-600">
                      Assigned to
                    </Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6">
                        <span className="block truncate">
                          {selectedUser.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <Listbox.Option
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "bg-amber-600 text-white"
                                  : "text-gray-600",
                                "relative cursor-default select-none py-2 pl-3 pr-9",
                              )
                            }
                            value={noAssignee}
                          >
                            {noAssignee.name}
                          </Listbox.Option>
                          {props.users.map((user, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-amber-600 text-white"
                                    : "text-gray-600",
                                  "relative cursor-default select-none py-2 pl-3 pr-9",
                                )
                              }
                              value={user}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate",
                                    )}
                                  >
                                    {user.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? "text-white"
                                          : "text-amber-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Content
              </label>
              <div className="mt-2">
                <TicketContentEditor content={content} onChange={setContent} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md px-3 py-2 text-sm font-semibold leading-6 text-gray-600 hover:text-amber-600"
        >
          Cancel
        </button>
        <button
          name="draft"
          type="submit"
          className="rounded-md px-3 py-2 text-sm text-gray-600 font-semibold shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 hover:bg-gray-300 hover:text-gray-700"
        >
          Draft
        </button>
        <button
          name="save"
          type="submit"
          className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-gray-50 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
