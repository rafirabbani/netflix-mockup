import React from 'react'
import { Link } from "react-router-dom";
import { HomeIcon, GlobeIcon, FlagIcon, UsersIcon} from '@heroicons/react/solid'

export default function Sidebar() {

    const [collapseShow, setCollapseShow] = React.useState("hidden");
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0  md:bottom-0 md:w-48 py-18 px-6 bg-blue-100">
                <div className="md:flex-col md:items-stretch md:min-h-18 md:flex-no-wrap px-0  items-center justify-between w-full mx-auto">

                    {/* <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-5 pb-4 no-underline">
                        HR Full Stack
                    </h6> */}
                    {/* Navigation */}

                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    <li className="dropdown items-center">
                        <Link
                                className={
                                    "text-l py-3 block font-bold mt-5 hover:bg-gray-200 rounded-lg"
                                }
                                to="/hr/dashboard/"
                                
                            >
                                <i className={
                                        "text-l flex items-center not-italic"
                                    }><HomeIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Dashboard</i>{""}                        
                        </Link>
                        </li>
                        <li className="items-center">
                            <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-lg"
                                }
                                to="/hr/regions/"
                            >
                                <i
                                    className={
                                        "text-l flex items-center not-italic "
                                    }
                                ><GlobeIcon className='h-5 w-5 text-gray-500 mr-2'/>Regions</i>{""}
                                
                            </Link>
                            <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-lg"
                                }
                                to="/hr/countries/"
                            >
                                <i className={
                                        "text-l flex items-center not-italic"
                                    }><FlagIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Countries</i>{""}                        
                        </Link>
                        <Link
                                className={
                                    "text-l py-3 block font-bold hover:bg-gray-200 rounded-lg"
                                }
                                to="/hr/employees/"
                            >
                                <i className={
                                        "text-l flex items-center not-italic"
                                    }><UsersIcon className={'h-5 w-5 text-gray-500 mr-2'}/>Employees</i>{""}                        
                        </Link>
                        
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}