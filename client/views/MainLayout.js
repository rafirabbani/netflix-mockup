import React, { Fragment } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainLayout(props) {
  return (
    <div>
      <div className='grid grid-cols-6 gap-4 bg-gray-300'>
        <div className><Sidebar/></div>
        <div className='col-span-5'>
        <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {props.children}
          {/* /End replace */}
        </div>
      </main>
      <Footer/>
        </div>
      </div>
      </div>
  )
}