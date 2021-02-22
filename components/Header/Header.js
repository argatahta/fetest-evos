import React from "react";

function Header({ children }) {
    return (
        <div className="z-20 fixed bg-black bg-opacity-80 text-white px-4 py-4 font-bold flex flex-row justify-between sm:justify-center w-full border-b border-yellow-300">
        {children}
        </div>
    )
}

export default Header