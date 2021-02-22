const getIdFromUrl = (url) => {
    const splitUrl = url.split("/")
    return splitUrl[splitUrl.length - 2]       
}

export default getIdFromUrl