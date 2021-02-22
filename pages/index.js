
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SearchInput from "../components/SearchInput";
import StarshipCard from "../components/StarshipCard";
import Layout from "../components/Layout";
import Header from "../components/Header";
import StarshipsAPI from "../api/startships";
import getIdFromUrl from "../utils/getIdFromUrl";

import { saveStarships, saveSearch, clearStarship, addSearchedItem } from "../redux/actions/starships"

export default function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const search = useSelector(state => state.starships.search);
  const searchedItems = useSelector(state => state.starships.searchedItems);
  const starships = useSelector(state => state.starships.data);
  const page = useSelector(state => state.starships.page);
  const totalResult = useSelector(state => state.starships.totalResult)

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name == "search") {
      dispatch(saveSearch(value))
    };
  }

  const handleScroll = () => {
    const scrollTop = document?.documentElement?.scrollTop ?? document.body.scrollTop

    const scrollHeight = document?.documentElement?.scrollHeight ?? document.body.scrollHeight

    if (scrollTop + window.innerHeight + 10 >= scrollHeight) {
      setLoadMore(true);
    }
  }

  useEffect(() => {
    setLoadMore(false);
    //get data
    const starshipsCurrentTotal = starships.length
    if (starshipsCurrentTotal > 0 && starshipsCurrentTotal < totalResult && !loading) {
      getStarships()
    }
  }, [loadMore]);

  useEffect(() => {
    getStarships()
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStarships = async (isSearch) => {
    setError("");
    setLoading(true)
    if(isSearch) {
      dispatch(addSearchedItem(search))
    }
    try {
      const pages = isSearch ? 1 : parseInt(page) + 1
      const result = await StarshipsAPI.getStarships({ filter: search, page: pages });
      if (result.data && result.data.results.length > 0) {
        const datas = result.data?.results ?? []
        const updatedData = isSearch ? datas : starships.concat(datas)
        const totalResults = result.data?.count
        dispatch(saveStarships({ data: updatedData, totalResult: totalResults, page: pages }))
      } else {
        setError("No starships found");
      }
      setLoading(false);
    } catch (error) {
      setError("Error");
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Header>
        <div className="flex flex-row">
          <SearchInput
            id="search"
            name="search"
            placeholder="Search starship"
            searchedItems={searchedItems}
            onSearchedItemClick={(item) => {
              dispatch(saveSearch(item))
              dispatch(clearStarship())
              getStarships(true)
            }}
            value={search}
            onSearchClick={(e) => {
              e && e.preventDefault()
              if (search) {
                dispatch(clearStarship())
                getStarships(true)
              }
            }}
            onChange={onChange}
          />
        </div>
      </Header>

      <div className="px-4 flex flex-col mx-auto max-w-3xl pt-20">
        {starships.length > 0 && (
          starships.map((data) => (
            <StarshipCard
              title={data.name}
              onStarshipClick={() => router.push(`/${getIdFromUrl(data.url)}`)}
            />
          ))
        )}

        {starships.length == 0 && !loading && !error && (
          <p className="my-5 text-lg text-white">Please search for a starship</p>
        )}

        {loading && (
          <p className="my-5 self-center text-white">Loading...</p>
        )}

        {error && (
          <p className="my-5 self-center text-red-600">{error}</p>
        )}
      </div>

    </Layout>
  )
}
