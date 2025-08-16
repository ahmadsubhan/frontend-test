import { IoClose } from "react-icons/io5";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex items-center relative w-full md:max-w-md bg-white rounded-md">
      <input
        placeholder="Cari Nama Barang..."
        className="w-full border py-2 pl-3 pr-10 rounded-md outline-none border-divider focus:border-focus hover:border-focus"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2"
          onClick={() => onChange("")}
        >
          <IoClose className="cursor-pointer text-xl" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
