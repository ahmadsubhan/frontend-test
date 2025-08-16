import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import Button from "./Button";

const Pagination = ({ setPage }) => {
  const next = () => {
    setPage((prev) => prev + 1);
  };
  const previous = () => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  };
  return (
    <div className="flex items-center gap-2 justify-end">
      <Button onClick={previous} className="py-3">
        <IoChevronBackOutline />
      </Button>
      <Button onClick={next} className="py-3">
        <IoChevronForwardOutline />
      </Button>
    </div>
  );
};

export default Pagination;
