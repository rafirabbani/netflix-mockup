import React from 'react'
import { Link } from "react-router-dom";
import { HomeIcon, UsersIcon, FilmIcon, SparklesIcon, AnnotationIcon} from '@heroicons/react/solid'
import netflixpng from '../../assets/images/netflix-123.png'


export default function Sidebar() {

    const [collapseShow, setCollapseShow] = React.useState("hidden");
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:w-48 py-18 px-6 bg-gray-900">
                <div class='justify-center'><img src={netflixpng} class='w-7 h-7 m-auto block mt-5 mb-5'/></div>
                <div className="md:flex-col md:items-stretch md:min-h-18 md:flex-no-wrap px-0  items-center justify-between w-full mx-auto">
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    <li className="dropdown items-center">
                        <Link
                                className={
                                    "text-l py-3 block font-bold  hover:bg-gray-200 rounded-xl"
                                }
                                to="/netflix-mockup/dashboard/"
                                
                            >
                                <i className={
                                        "text-l flex items-center not-italic text-red-600"
                                    }><HomeIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Dashboard</i>{""}                        
                        </Link>
                        </li>
                        <li className="items-center">
                            <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-xl"
                                }
                                to="/netflix-mockup/movies/"
                            >
                                <i
                                    className={
                                        "text-l flex items-center not-italic text-red-600 "
                                    }
                                ><FilmIcon className='h-5 w-5 text-gray-500 mr-2'/>Movies</i>{""}
                                
                            </Link>
                            <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-xl"
                                }
                                to="/netflix-mockup/casts/"
                            >
                                <i className={
                                        "text-l flex items-center not-italic text-red-600"
                                    }><SparklesIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Casts</i>{""}                        
                        </Link>
                        <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-xl"
                                }
                                to="/netflix-mockup/comments/"
                            >
                                <i className={
                                        "text-l flex items-center not-italic text-red-600"
                                    }><AnnotationIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Comments</i>{""}                        
                        </Link>
                        <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-xl"
                                }
                                to="/netflix-mockup/users/"
                            >
                                <i className={
                                        "text-l flex items-center not-italic text-red-600"
                                    }><UsersIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Users</i>{""}                        
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}