import { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconCross from "./icons/IconCross";
import Tabs from "./Tabs";
import { UserData } from "@/utils/types";

const CandidateDetailsModal: FC<{
  details: UserData;
  isOpen: boolean;
  onClose: () => void;
}> = ({ details, isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-full bg-transparent p-1 hover:bg-gray-200 focus-visible:outline-none"
                    onClick={onClose}
                  >
                    <IconCross className="h-5 w-5" />
                  </button>
                </Dialog.Title>
                <div className="min-w-screen space-y-4">
                  <div className="flex flex-col sm:flex-row min-w-0 gap-4">
                    <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-indigo-200">
                      <span className="text-xl font-medium leading-none text-gray-700">
                        {details.name
                          .match(/(\b\S)?/g)
                          ?.join("")
                          .toUpperCase()}
                      </span>
                    </span>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {details.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {details.email}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {details.phone}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {details.location}
                      </p>
                    </div>
                  </div>
                  <Tabs details={details} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CandidateDetailsModal;
