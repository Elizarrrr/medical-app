import DoctorDetails from '@/components/DoctorDetails'
import FixedBookButton from '@/components/FixedBookButton'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className='bg-slate-100 dark:bg-slate-900 py-8 min-h-screen'>
        <div className="bg-white dark:bg-black max-w-4xl border border-gray-200 dark:border-gray-600 mx-auto shadow-md rounded-md">
            <div className="py-8 px-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex flex-col">
                        <h2 className='uppercase font-bold text-2xl'>Vijal Patel, PA-C</h2>
                        <p className="text-gray-600 text-sm uppercase dark:text-gray-400">Adult Health</p>
                        </div>
                        <div className="py-3">
                            <p>In-Person doctor visit</p>
                            <p>3250 Lincoln Highway, Kendall Park, NJ 08824</p>
                        </div>
                    </div>
                    <Image src="/doctor1.jpg" width={365} height={369} alt="Doctor" className="w-36 h-36 rounded-full object-cover"/>
                </div>
            </div>
            <div>
                <DoctorDetails/>
            </div>
        </div>
        <FixedBookButton/>
    </div>
  )
}
