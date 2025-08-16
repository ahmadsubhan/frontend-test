import { IoArrowForward } from "react-icons/io5";

import Button from "./Button";

const Card = ({ do_no, goods_name, origin_name, destination_name }) => {
  return (
    <div className="rounded-lg px-4 py-3 shadow bg-white flex flex-col gap-4">
      <div>
        <p className="font-medium">ORDER ID</p>
        <p className="font-bold text-lg">{do_no}</p>
      </div>

      <div>
        <p className="font-medium">{goods_name}</p>
        <div className="flex items-center gap-2">
          <p>{origin_name}</p>

          <IoArrowForward />

          <p>{destination_name}</p>
        </div>
      </div>

      <Button className="w-full text-sm">Lihat Detail</Button>
    </div>
  );
};

export default Card;
