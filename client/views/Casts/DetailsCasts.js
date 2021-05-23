import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilAltIcon } from '@heroicons/react/outline'
import apiMovie from '../Movies/ApiMovies'
import apiCast from './ApiCasts'

export default function DetailsCast(props) {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef()
  const [blob, setBlob] = useState([]);
  const [files, setFiles] = useState([]);
  const [edit, setEdit] = useState(false)
  const [movies, setMovies] = useState([])
  const [values, setValues] = useState({
        cast_id: undefined,
        cast_name: undefined,
        cast_movie_id: undefined
  });

  useEffect(() => {
    apiMovie.getAll().then(data => {
        setMovies(data)
        })
  }, [])

  const onEdit = () => {
      setEdit(!edit)
  } 

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
  }

  const uploadSingleFile = name => event => {
    //1.untuk ubah file ke blob agar bisa di preview image nya
    setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) })

    //2. simpan data File, bisa juga gunakan blob, lalu blob diconvert lagi
    // ke File type, spy ga bingung kita coba gunakan cara ini aja
    setFiles({ ...files, [name]: event.target.files[0] })
}

  const onSubmit = (id) => {
    /* const req = {
       cast_id: id,
       cast_name: values.cast_name,
       cast_movie_id: values.cast_movie_id
    } */
    let edit = new FormData();
    edit.append('cast_id', id);
    values.cast_name && edit.append('cast_name', values.cast_name);
    values.cast_movie_id && edit.append('cast_movie_id', values.cast_movie_id);
    files.image && edit.append('cast_image', files.image);


    apiCast.edit(edit).then(result => {
        console.log(result)
    }); 
    modalClose()
 }

  const modalClose = () => {
    for (const key in props.employee){
        props.cast[key] = undefined;
    }
    setEdit(false)
    setOpen();
    props.setStatus()
    props.setDetailsCast();
}

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
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
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        <div className="text-left"><button className='float-right mt-3 w-full inline-flex justify-center rounded-md border 
                        border-blue-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white 
                        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm' onClick={onEdit} ><PencilAltIcon className="-ml-1 mr-2 h-5 w-5 text-white"/>Edit</button>{props.title} </div>
                    </Dialog.Title>
                    <div className=" mt-2 sm:flex sm:items-start">
                    <form method='POST' action='#' className={edit ? 'pointer-events-auto' : "pointer-events-none"} >
                    <div className='block mt-5'><label>Cast ID</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='cast_id' name='cast_id' 
                            type='text' 
                            placeholder={props.cast.castId} readOnly/>
                        </div> 
                        <div className='block mt-5'><label>Cast Name</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='cast_name' name='cast_name' 
                            type='text' 
                            onChange={handleChange('cast_name')} 
                            placeholder={props.cast.castName}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Title</label></div>
                         <div className='block mt-1'><select class='rounded-lg w-60' id='cast_movie_id' name='cast_movie_id' type='text'
                            onChange={handleChange('cast_movie_id')}>
                            <option defaultValue hidden>{props.cast.movieTitle}</option>
                            {movies && movies.map(data => {
                                return (<option value={data.movie_id}>{data.movie_title}</option>)
                            })}
                            </select>
                        </div>
                        <div className={edit ? 'hidden' : 'block'}>
                        <div className='block mt-5'><label>Movie Image</label></div>
                        <div className='block mt-1'>
                          <img src={`/api/casts/image/${props.cast.castId}`} className='h-48 w-48'>
                          </img>
                        </div>
                        </div>
                        <div className={edit ? 'block' : 'hidden'}>
                        <div className='block mt-5'><label>Movie Image</label></div>
                        <div className="mt-1 col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                          <div className="space-y-2 text-center">
                            <div className="mx-auto h-48 w-24 text-gray-400">
                              <img src={blob.image} alt='' className="mx-auto h-48 w-48" />
                            </div>
                            <div className="flex text-sm">
                              <label for="image" className="relative cursor-pointer bg-white rounded-lg font-medium hover:text-blue-400">
                                Upload Image
                                  <input id="image" name="image" onChange={uploadSingleFile('image')} type="file" className="sr-only" />
                              </label>
                            </div>
                          </div>
                        </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onSubmit(props.cast.castId)}
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