import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import StarshipsAPI from "../api/startships";

function ItemDetail({ title, value, className }) {
  return (
    <div className={`flex flex-row ${className}`}>
      <p className="font-bold text-green-300 mr-2">{title}: </p>
      <p className="text-gray-200">{value ? value : "-"}</p>
    </div>
  )
}

export default function StarshipDetail({ id }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    getStarship()
  }, []);

  const getStarship = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await StarshipsAPI.getStarshipDetail(id);
      if (result.data) {
        const starshipData = result.data ?? {}
        setData(starshipData);
      }
      setLoading(false);
    } catch (error) {
      setError(error ?? "Error");
      setLoading(false);
    }
  }

  return (
    <Layout className="bg-gray-200" >
      <div className="sm:px-4 flex flex-col mx-auto max-w-3xl">
        {loading ? (
          <p className="my-5 self-center text-white">Loading...</p>
        ) : (
            <div className="flex flex-col bg-gray-800 bg-opacity-80 min-h-screen">
              <div className="flex flex-row justify-around px-10 py-5 bg-gray-800">
                  <h1 className="text-yellow-300 max-w-lg text-4xl mb-1">{data.name} </h1>
              </div>

              <div className="flex flex-col p-5">
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Model"}
                  value={data.model}
                />
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Class"}
                  value={data.starship_class}
                />
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Manufacturer"}
                  value={data.manufacturer}
                />
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"MGLT"}
                  value={data.MGLT}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Cargo Capacity"}
                  value={data.cargo_capacity}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Consumables"}
                  value={data.consumables}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Cost"}
                  value={data.cost_in_credits}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Hyperdrive Rating"}
                  value={data.hyperdrive_rating}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Length"}
                  value={data.length}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Max Atmosphering Speed"}
                  value={data.max_atmosphering_speed}
                />
                 <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"passengers"}
                  value={data.passengers}
                />
              </div>

            </div>
          )}


      </div>

    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  return {
    props: { id }
  }
}
