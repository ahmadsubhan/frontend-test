"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";

import Button from "./Button";

import { DESTINATION_OPTIONS, ORIGIN_OPTIONS } from "@/data/location";

const Filter = ({ originVal = [], destinationVal = [], handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("origin");
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [search, setSearch] = useState("");

  const options = activeTab === "origin" ? ORIGIN_OPTIONS : DESTINATION_OPTIONS;
  const optionCheckbox = activeTab === "origin" ? origin : destination;

  const locations = options.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const reset = () => {
    setOrigin([]);
    setDestination([]);
    setSearch("");
  };

  const close = () => {
    setActiveTab("origin");

    setSearch("");
    setIsOpen(false);
  };

  const isDisabled = () => {
    const orgString = origin.sort().join("");
    const orgValString = originVal.sort().join("");
    const dstString = destination.sort().join("");
    const dstValString = destinationVal.sort().join("");

    return orgString === orgValString && dstString === dstValString
      ? true
      : false;
  };

  return (
    <div className="relative w-full md:w-auto">
      <Button
        className="w-full"
        onClick={() => {
          setOrigin(originVal);
          setDestination(destinationVal);
          setIsOpen(true);
        }}
      >
        Filter
      </Button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black opacity-30 z-40"
          onClick={() => {
            close();
          }}
        />
      )}

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white border border-divider rounded-md shadow z-50">
          <div className="w-full flex border-b border-divider">
            <div className="border-r border-divider px-3 py-5">
              <p
                onClick={() => setActiveTab("origin")}
                className={`w-full mb-1 py-1.5 px-4 cursor-pointer rounded-xl ${
                  activeTab === "origin"
                    ? "bg-secondary text-primary font-medium"
                    : ""
                }`}
              >
                Origin
              </p>
              <p
                onClick={() => setActiveTab("destination")}
                className={`w-full mt-1 py-1.5 px-4 cursor-pointer rounded-xl ${
                  activeTab === "destination"
                    ? "bg-secondary text-primary font-medium"
                    : ""
                }`}
              >
                Destination
              </p>
            </div>

            <div className="px-4 py-5">
              <div className="flex items-center relative w-full md:w-72 bg-white rounded-md">
                <input
                  placeholder="Cari..."
                  className="w-full border py-2 pl-3 pr-10 rounded-md outline-none border-divider focus:border-focus hover:border-focus text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 right-2"
                    onClick={() => setSearch("")}
                  >
                    <IoClose className="cursor-pointer text-xl" />
                  </div>
                )}
              </div>

              <div className="py-2">
                {locations.map(({ code, name }, index) => (
                  <div
                    key={`location-${index}`}
                    className="flex items-center gap-1 text-sm py-0.5"
                  >
                    <input
                      type="checkbox"
                      id={code}
                      value={code}
                      checked={optionCheckbox.includes(code)}
                      onChange={(e) => {
                        if (activeTab === "origin") {
                          if (origin.includes(e.target.value)) {
                            setOrigin((prev) =>
                              prev.filter((el) => el !== e.target.value)
                            );
                          } else {
                            setOrigin((prev) => [...prev, e.target.value]);
                          }
                        } else {
                          if (destination.includes(e.target.value)) {
                            setDestination((prev) =>
                              prev.filter((el) => el !== e.target.value)
                            );
                          } else {
                            setDestination((prev) => [...prev, e.target.value]);
                          }
                        }
                      }}
                    />
                    <label htmlFor={code}>{name}</label>
                  </div>
                ))}

                {locations.length === 0 && (
                  <p className="text-sm">Tidak ada data</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex py-2 px-4 justify-end gap-3">
            <Button
              className="py-1 text-sm text-primary bg-white"
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              className="py-1 text-sm"
              disabled={isDisabled()}
              onClick={() => {
                handleFilter({ origin, destination });
                close();
              }}
            >
              Terapkan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
