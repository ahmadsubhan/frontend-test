"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(1);
  const [originVal, setOriginVal] = useState([]);
  const [destinationVal, setDestinationVal] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .post(
        "https://frontend-api-mocking-production-2cb1.up.railway.app/api/orders",
        {
          keyword: searchVal,
          filter: {
            order_status: [0],
            origin_code: originVal,
            destination_code: destinationVal,
          },
          page: page,
        }
      )
      .then((res) => {
        const { order_list } = res.data;
        setOrders(order_list);
      })
      .finally(() => setLoading(false));
  }, [searchVal, originVal, destinationVal, page]);

  useEffect(() => {
    let delay = setTimeout(() => {
      setSearchVal(search);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(delay);
    };
  }, [search]);

  const handleFilter = ({ origin, destination }) => {
    setPage(1);
    setOriginVal(origin);
    setDestinationVal(destination);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
          <SearchBar value={search} onChange={setSearch} />
          <Filter
            originVal={originVal}
            destinationVal={destinationVal}
            handleFilter={handleFilter}
          />
        </div>

        <Pagination setPage={setPage} />
      </div>

      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent mb-32"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
          {orders.map(
            ({ do_no, goods_name, origin_name, destination_name }, index) => (
              <Card
                key={`card-${index}`}
                do_no={do_no}
                goods_name={goods_name}
                origin_name={origin_name}
                destination_name={destination_name}
              />
            )
          )}

          {Boolean(orders.length === 0) && (
            <div className="col-span-3">
              <p className="text-center font-bold text-2xl">Tidak ada data.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
