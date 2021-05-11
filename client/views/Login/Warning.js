import React, { useState } from "react";
import { ExclamationIcon } from '@heroicons/react/solid'

export default function Warning(props) {
  const [showModal, setShowModal] = useState(false);
  const modalClose = () => {
    props.setWarning();
    setShowModal(false)
  }

  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-left p-5 border-b border-solid border-red-100 rounded-t bg-white">
                <ExclamationIcon className="h-10 w-10 text-red-600" aria-hidden="true" />
                  <h3 className="text-3xl font-semibold  text-red-600 ml-2">
                    Warning !!!
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto bg-red-600 text-white">
                  <p className="my-4 text-blueGray-500 text-xl leading-relaxed">
                    You don't have the right authorization to access this page
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-red-100 rounded-b bg-white">
                  <button
                    className="bg-white text-red-600 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-600 hover:text-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={modalClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  );
}
