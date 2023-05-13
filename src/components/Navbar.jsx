import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 bg-white rounded-md border-none outline-none focus-within shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full rounded-md bg-white outline-none"
          value={searchTerm}
          placeholder="Search"
          onFocus={() => navigate("/search")}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
          <img
            src={user?.image}
            alt="image"
            className="w-10 h-10 rounded-full"
          />
        </Link>
        <Link
          to="create-pin"
          className="bg-black flex justify-center items-center text-white rounded-lg w-12 h-12 md:w-14 md:h-14 "
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
