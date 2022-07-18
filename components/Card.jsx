import React from "react"

export default function Card({ children }) {
  return (
    <div className='bg-gray-100 shadow-2xl hover:shadow-neutral-400 transition-shadow duration-500 p-10 rounded-xl min-w-[450px]'>
      {children}
    </div>
  )
}
