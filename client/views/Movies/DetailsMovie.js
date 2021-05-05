import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilAltIcon } from '@heroicons/react/outline'
import apiMovie from './ApiMovies'

export default function DetailsMovie(props) {
  console.log(props.movie.movieRelease)
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef()
  const [edit, setEdit] = useState(false)
  const [values, setValues] = useState({
        movie_id: undefined,
        movie_tmdb: undefined,
        movie_rating: undefined,
        movie_view: undefined,
        movie_title: undefined,
        movie_episode: undefined,
        movie_director: undefined,
        movie_casts: undefined,
        movie_studio: undefined,
        movie_status: undefined,
        movie_duration: undefined,
        movie_release: undefined,
        movie_country: undefined,
        movie_genre: undefined,
        movie_network: undefined,
        movie_trailer: undefined,
  });

  const onEdit = () => {
      setEdit(!edit)
  } 

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
  }

  const onSubmit = (id) => {
    const req = {
        movie_id: id,
        movie_tmdb: values.movie_tmdb,
        movie_rating: values.movie_rating,
        movie_view: values.movie_view,
        movie_title: values.movie_title,
        movie_episode: values.movie_episode,
        movie_director: values.movie_director,
        movie_casts: values.movie_casts,
        movie_studio: values.movie_studio,
        movie_status: values.movie_status,
        movie_duration: values.movie_duration,
        movie_release: values.movie_release,
        movie_country: values.movie_country,
        movie_genre: values.movie_genre,
        movie_network: values.movie_network,
        movie_trailer: values.movie_trailer
    }
    apiMovie.edit(req).then(result => {
        console.log(result)
    }); 
    modalClose()
}

  const modalClose = () => {
    for (const key in props.employee){
        props.employee[key] = undefined;
    }
    setEdit(false)
    setOpen();
    props.setStatus()
    props.setDetailsMovie();
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
                    <div className='block mt-5'><label>Movie ID</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_id' name='movie_id' 
                            type='text' 
                            placeholder={props.movie.movieId} readOnly/>
                        </div>
                        <div className='block mt-5'><label>Movie TMDB</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_tmdb' name='movie_tmdb' 
                            type='text' 
                            onChange={handleChange('movie_tmdb')} 
                            placeholder={props.movie.movieTMDB}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Rating</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_rating' name='movie_rating' 
                            type='text' 
                            onChange={handleChange('movie_rating')} 
                            placeholder={props.movie.movieRating}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie View</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_view' name='movie_view' 
                            type='text' 
                            onChange={handleChange('movie_view')} 
                            placeholder={props.movie.movieView}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Title</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-72'id='movie_title' name='movie_title' 
                            type='text' 
                            onChange={handleChange('movie_title')} 
                            placeholder={props.movie.movieTitle}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Episode</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_episode' name='movie_episode' 
                            type='text' 
                            onChange={handleChange('movie_episode')} 
                            placeholder={props.movie.movieEpisode}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Director</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_director' name='movie_director' 
                            type='text' 
                            onChange={handleChange('movie_director')} 
                            placeholder={props.movie.movieDirector}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Casts</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-72'id='movie_casts' name='movie_casts' 
                            type='text' 
                            onChange={handleChange('movie_casts')} 
                            placeholder={props.movie.movieCasts}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Studio</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_studio ' name='movie_studio' 
                            type='text' 
                            onChange={handleChange('movie_studio')} 
                            placeholder={props.movie.movieStudio}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Status</label></div>
                         <div className='block mt-1'><select class='rounded-lg' id='movie-status' name='movie_status'
                            onChange={handleChange('movie_status')}>
                            <option value="" disabled selected hidden>{props.movie.movieStatus}</option>
                            <option value='On Going'>On Going</option>
                            <option value='Finished'>Finished</option>
                            </select>
                        </div>
                        <div className='block mt-5'><label>Movie Duration</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_duration' name='movie_duration' 
                            type='text' 
                            onChange={handleChange('movie_duration')} 
                            placeholder={props.movie.movieDuration}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Release</label></div>
                         <div className='block mt-1'><select class='rounded-lg' id='movie-release' name='movie_release'
                            onChange={handleChange('movie_release')}>
                            <option value="" disabled selected>{props.movie.movieRelease ? 'Released' : 'Not Released'}</option>
                            <option value='true'>Released</option>
                            <option value='false'>Not Released</option>
                            </select>
                        </div>
                        <div className='block mt-5'><label>Movie Country</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-72'id='movie_country' name='movie_country' 
                            type='text' 
                            onChange={handleChange('movie_country')} 
                            placeholder={props.movie.movieCountry}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Genre</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-72'id='movie_genre' name='movie_genre' 
                            type='text' 
                            onChange={handleChange('movie_genre')} 
                            placeholder={props.movie.movieGenre}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Network</label></div>
                        <div className='block mt-1'><input className='rounded-lg'id='movie_network' name='movie_network' 
                            type='text' 
                            onChange={handleChange('movie_network')} 
                            placeholder={props.movie.movieNetwork}
                          />
                        </div>
                        <div className='block mt-5'><label>Movie Trailer</label></div>
                        <div className='block mt-1'><input className='rounded-lg w-full'id='movie_trailer' name='movie_trailer' 
                            type='text' 
                            onChange={handleChange('movie_trailer')} 
                            placeholder={props.movie.movieTrailer}
                          />
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
                  onClick={() => onSubmit(props.movie.movieId)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => modalClose()}
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