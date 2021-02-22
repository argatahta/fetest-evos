import React, { useRef, useState } from 'react'

function SearchInput({
    onChange = () => { },
    value,
    placeholder = "Search Starship",
    id = "search",
    onSearchClick = () => { },
    onSearchedItemClick = () => { },
    searchedItems = [],
    classContainer,
    classInput
}) {
    const inputEl = useRef(null);
    const [isInputFocus, setIsInputFocus] = useState(false);
    const handleOnSearchClick = (e) => {
        blurInput()
        onSearchClick(e);
    }

    const handleOnSearchedItemClick = (item) => {
        blurInput()
        onSearchedItemClick(item)
    }

    const blurInput = () =>{
        inputEl.current.blur();
        setIsInputFocus(false);
    }

    return (
        <div className={`flex flex-col ${classContainer}`}>
            <form autoComplete="off" onSubmit={handleOnSearchClick} className={`flex flex-row bg-gray-700 rounded border border-gray-700 w-screen max-w-xs sm:max-w-lg`}>
                <input
                    ref={inputEl}
                    type='text'
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    className={`px-4 py-2 outline-none w-full text-gray-100 bg-gray-700 ${classInput}`}
                    value={value}
                    onChange={onChange}
                    onFocus={()=>setIsInputFocus(true)}
                    onBlur={()=>setTimeout(() => {
                        setIsInputFocus(false)
                    }, 200)}
                />
                <button type="submit" onClick={handleOnSearchClick} className="px-5 outline-none focus:outline-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="gray">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>

            {/* SEARCHED ITEMS */}
            {value && (searchedItems.length > 0) && (
                <div className={`absolute top-14 flex flex-col w-screen max-w-xs sm:max-w-lg bg-white rounded border border-gray-200 mt-1 ${isInputFocus? "block" : "hidden"}`}>
                    {
                        searchedItems.map((item, idx) => (
                            <p
                            key={item+idx}
                                className={`px-4 py-2 outline-none w-full text-black cursor-pointer hover:bg-gray-200`}
                                onClick={() => { handleOnSearchedItemClick(item) }}
                            >{item}</p>
                        ))
                    }
                </div>
            )}

        </div>

    )
}

export default SearchInput