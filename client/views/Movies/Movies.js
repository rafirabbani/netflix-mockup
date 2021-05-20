import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import apiMovie from './ApiMovies'
import AddMovie from './AddMovie'
import DetailsMovie from './DetailsMovie' 
import {TrashIcon, FolderOpenIcon} from '@heroicons/react/outline'

export default function Movies() {
    
    const [datas, setDatas] = useState([]);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(false);
    const [detailsMovie, setDetailsMovie] = useState(false);
    const [movie, setMovie] = useState({
        movieId: undefined,
        movieTMDB: undefined,
        movieRating: undefined,
        movieView: undefined,
        movieTitle: undefined,
        movieEpisode: undefined,
        movieDirector: undefined,
        movieCasts: undefined,
        movieStudio: undefined,
        movieStatus: undefined,
        movieDuration: undefined,
        movieRelease: undefined,
        movieCountry: undefined,
        movieGenre: undefined,
        movieNetwork: undefined,
        movieTrailer: undefined,
    })

    useEffect(() => {
        apiMovie.getAll().then(data => {
            setDatas(data)
        }). catch(err => {
            console.log(err)
        });
    }, []);

       useEffect(() => {
        apiMovie.getAll().then(data => {
            setDatas(data);
            setStatus(false);
        }).catch(err => {
            console.log(err)
        });
    }, [status]);
    
    const onDestroy = (id, title) => {
        apiMovie.destroy(id, title).then((result) => {
            //console.log(result)
            setStatus(true)
        })
    }

    const onDetails = (movieId, movieTMDB, movieRating, movieView, movieTitle, movieEpisode, movieDirector, movieCasts, movieStudio, movieStatus, movieDuration, movieRelease, movieCountry, movieGenre, movieNetwork, movieTrailer) => {
        setDetailsMovie(true)
        setMovie({
            movieId: movieId,
            movieTMDB: movieTMDB,
            movieRating: movieRating,
            movieView: movieView,
            movieTitle: movieTitle,
            movieEpisode: movieEpisode,
            movieDirector: movieDirector,
            movieCasts: movieCasts,
            movieStudio: movieStudio,
            movieStatus: movieStatus,
            movieDuration: movieDuration,
            movieRelease: movieRelease,
            movieCountry: movieCountry,
            movieGenre: movieGenre,
            movieNetwork: movieNetwork,
            movieTrailer: movieTrailer,
        })
    }

    return (
        <>
            <h1><Header title={'Movie'} setModal={() => setModal(true)}/></h1>
            <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie Title
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie Trailer
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Details
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {datas.map((movie) => (
                                            <tr key={movie.movie_id}>

                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{movie.movie_id}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{movie.movie_title}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{movie.movie_trailer}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap content-left text-sm font-medium">
                                                    <a>
                                                        <button  onClick={() => onDetails(movie.movie_id, movie.movie_tmdb, movie.movie_rating, movie.movie_view, 
                                                            movie.movie_title, movie.movie_episode, movie.movie_director, movie.movie_casts, movie.movie_studio, 
                                                            movie.movie_status, movie.movie_duration, movie.movie_release, movie.movie_country, movie.movie_genre,
                                                            movie.movie_network, movie.movie_trailer) }>
                                                            <FolderOpenIcon className="h-5 w-5 text-blue-500"/></button>
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap content-left text-sm font-medium">
                                                    <a>
                                                        <button  onClick={ () => {
                                                                if (
                                                                    window.confirm(
                                                                        "Are you sure you wish to delete this item?"
                                                                    )
                                                                )
                                                                    onDestroy(movie.movie_id, movie.movie_title)
                                                            } } ><TrashIcon className="h-5 w-5 text-red-500"/></button>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {  modal ? <AddMovie
                    title={'Add Movie'} 
                    setModal={() => setModal(false)} 
                    setStatus={() => setStatus(true)} 
                    /> : null }
                    { detailsMovie ? <DetailsMovie
                    title= {'Movie Details'}
                    setDetailsMovie= {() => setDetailsMovie(false)}
                    setStatus={() => setStatus(true)}
                    movie={movie}
                    /> : null }
        
                </div>
        </>
    );
}
