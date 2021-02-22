import React from 'react'

function StarshipCard({
    onStarshipClick=()=>{},
    title="Untitled Starship",
}) {
    return (
        <div onClick={onStarshipClick} className="flex flex-col text-2xl items-center my-5 bg-gray-800 w-full max-w-lg shadow-md rounded-2xl p-10 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 border hover:border-green-300 ">
            <a onClick={onStarshipClick} className="flex cursor-pointer text-gray-200 overflow-auto">{title}</a>
        </div>
    )
}

export default StarshipCard