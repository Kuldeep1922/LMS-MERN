import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='flex '>
            <div className=' bg-[#efefef] hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0 left-0 h-screen'>
                <div className='mt-20 space-y-4'>
                    <Link to={"dashboard"} className='flex items-center gap-2'>
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <hr className="h-1  bg-gray-300 my-4 mx-auto" />
                    <Link to={"course"} className='flex items-center gap-2'>
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>
            <div className=' flex-1 bg:white  ml-10'>
                <Outlet className=" mx-10" />
                </div>
        </div>
    )
}

export default Sidebar