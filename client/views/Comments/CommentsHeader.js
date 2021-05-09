import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UsersHeader(props) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate mb-2 text-red-600">{props.title}</h2>
      </div>
    </div>
  )
}