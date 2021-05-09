import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import {TrashIcon, FolderOpenIcon} from '@heroicons/react/outline'

export default function Casts() {
    const [datas, setDatas] = useState([]);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        apiCast.getAll().then(data => {
            setDatas(data)
        }). catch(err => {
            console.log(err)
        });
    }, []);
    
       useEffect(() => {
        apiCast.getAll().then(data => {
            setDatas(data);
            setStatus(false);
        }).catch(err => {
            console.log(err)
        });
    }, [status]);

    const onDestroy = (id) => {
        apiComment.destroy(id).then((result) => {
            console.log(result)
            setStatus(true)
        })
    }

    return (
        <>
            <h1><Header title={'Cast'} setModal={() => setModal(true)}/></h1>
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
                                                Comment ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Comment Text
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Movie Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                User Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {datas.map((comment) => (
                                            <tr key={cast.cast_id}>

                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{comment.comment_id}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{comment.comment_text}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{comment.movie.movie_title}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{comment.user.user_email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap content-left text-sm font-medium">
                                                    <a>
                                                        <button  onClick={ () => onDetails(cast.cast_id, cast.cast_name, cast.cast_movie_id, cast.movie.movie_title) }>
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
                                                                    onDestroy(cast.cast_id)
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
                    {  modal ? <AddCast
                    title={'Add Cast'} 
                    setModal={() => setModal(false)} 
                    setStatus={() => setStatus(true)} 
                    /> : null }
                    { detailsCast ? <DetailsCasts
                    title= {'Cast Details'}
                    setDetailsCast= {() => setDetailsCast(false)}
                    setStatus={() => setStatus(true)}
                    cast={cast}
                    /> : null }
        
                </div>
        </>
    );
}

