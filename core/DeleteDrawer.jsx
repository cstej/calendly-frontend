import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CtmButton from "./buttons/CtmButton";

export default function DeleteDrawer({ show = false, closeModal,title="heading" }) {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold text-center leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-5 flex justify-center">
                   {"Are you sure want to delete ?"}
                  </div>

                  <div className="mt-7 flex justify-end gap-3">
                    <CtmButton
                    text={"No"}
                    handler={closeModal}
                    CtmclassName={"bg-gray-200 text-[13px] px-7 rounded-md hover:bg-gray-400 transition-all duration-300"}
                    />
                    <CtmButton
                    text={"Yes"}
                    handler={closeModal}
                    CtmclassName={"bg-red-300 hover:bg-red-500 text-white text-[13px] px-7 rounded-md hover:bg-gray-400 transition-all duration-300"}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
