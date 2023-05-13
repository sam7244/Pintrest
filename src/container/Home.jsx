import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import { userQuery } from "../utils/data";
import { client, urlFor } from "../client";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="hidden md:flex h-screen flex-initial ">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden">
        <div className="flex items-center w-full p-2 justify-between">
          <HiMenu
            fontSize={20}
            onClick={() => setToggleSidebar(true)}
            className="w-8 h-8"
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-img"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white  animate-slide-in z-10">
            <div className="absolute flex justify-end p-2 w-full">
              <AiFillCloseCircle onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar setToggleSidebar={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="overflow-y-scroll flex-1 pb-2" ref={scrollRef}>
        <Routes>
          <Route path="/*" element={<Pins user={user && user} />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
