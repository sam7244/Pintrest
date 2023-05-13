import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-w-210 overflow-y-scroll justify-between hide-scrollbar">
      <div className="flex flex-col">
        <Link
          onClick={handleCloseSidebar}
          to="/"
          className="flex items-center my-6 gap-2 px-5 pt-1 justify-center w-190"
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            onClick={handleCloseSidebar}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHomeFill />
            <p className="font-extrabold ">Home</p>
          </NavLink>
          <p className="p-2 text-base font-semibold">Discover Categories</p>
          {categories?.slice(0, categories?.length - 1).map((category, idx) => (
            <NavLink
              key={`${category.name}-${idx}`}
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <img
                src={category.image}
                className="w-10 h-10 rounded-full"
                alt="category"
              />
              <p>{category.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user?._id}`}
          className="flex my-5 mb-3 items-center gap-2 p-2 rounded-lg"
          onClick={handleCloseSidebar}
        >
          <img
            src={user?.image}
            alt="user-image"
            className="w-10 h-10 rounded-full"
          />
          <p>{user?.username}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
