import React,{ Fragment, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserAddIcon } from '@heroicons/react/outline'
import apiUser from '../Users/ApiUsers'


export default function AddCast(props) {
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef()
    const [values, setValues] = useState({
        user_id: undefined,
        user_name: undefined,
        user_email: undefined,
        user_password: undefined,
        user_type: undefined,

    });

    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const req = {
          user_id: undefined,
          user_name: values.user_name,
          user_email: values.user_email,
          user_password: values.user_password,
          user_type: values.user_type
        }
         apiUser.create(req).then(result => {
            console.log(result)
        }); 
        modalClose()
    }
    
    const modalClose = () => {
        setOpen();
        props.setModal();
    }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto bg-blue-100 bg-opacity-10 bg-modal"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={modalClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <UserAddIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {props.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <form method='POST' action='#'>
                        <div className='block mt-1'><input className='rounded-lg hidden'id='user_id' name='user_id' 
                            type='text' />
                        </div> 
                        <div className='block mt-5'><label>User Name</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='user_name' name='user_name' 
                            type='text' 
                            onChange={handleChange('user_name')} 
                            placeholder={'e.g. Jason Statham'}
                          />
                        </div>
                        <div className='block mt-5'><label>User Email</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-72'id='user_email' name='user_email' 
                            type='text' 
                            onChange={handleChange('user_email')} 
                            placeholder={'e.g. jason.statham@mymail.com'}
                          />
                        </div>
                        <div className='block mt-5'><label>User Password</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='user_password' name='user_password' 
                            type='password' 
                            onChange={handleChange('user_password')} 
                            placeholder={'Enter Your Password'}
                          />
                        </div>
                        <div className='block mt-5'><label>User Type</label></div>
                         <div className='block mt-1'><select class='rounded-lg w-48' id='user_type' name='user_type' type='text'
                            onChange={handleChange('user_type')}>
                            <option defaultValue hidden>Choose User Type</option>
                            <option value='ADMIN'>Admin</option>
                            <option value='USER'>User</option>
                            </select>
                        </div>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={modalClose}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}