import React, { useState, useEffect } from 'react'
import UsersHeader from './UsersHeader'
import { TrashIcon } from '@heroicons/react/outline'
import apiUser from './ApiUsers'

export default function Users() {
    const [datas, setDatas] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        apiUser.getAll().then(data => {
            setDatas(data)
        }). catch(err => {
            console.log(err)
        });
    }, []);

    useEffect(() => {
        apiUser.getAll().then(data => {
            setDatas(data);
            setStatus(false);
        }).catch(err => {
            console.log(err)
        });
    }, [status]);
    
    const onDestroy = (id) => {
        apiUser.destroy(id).then((result) => {
            console.log(result)
            setStatus(true)
        })
    }

    return (
        <>
            <h1><UsersHeader title={'Users'}/></h1>
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
                                                User ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                User Name
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                User Email
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {datas.map((user) => (
                                            <tr key={user.user_id}>

                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{user.user_id}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{user.user_name}</div>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <div className="px-6 py-4whitespace-nowrap text-sm text-gray-500 text-left">{user.user_email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap content-left text-sm font-medium">
                                                    <a>
                                                        <button  onClick={ () => {
                                                                if (
                                                                    window.confirm(
                                                                        "Are you sure you wish to delete this item?"
                                                                    )
                                                                )
                                                                    onDestroy(user.user_id)
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
                </div>
        </>
    );
}
