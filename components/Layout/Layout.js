import React from "react";

function Layout({ children, className }) {
    return (
        <div className={`bg-stars-image bg-repeat  bg-fixed container mx-auto min-h-screen min-w-full sm:flex sm:flex-col bg-black ${className}`}>
            {children}
        </div>
    )
}

export default Layout