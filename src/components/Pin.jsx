import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";

const Pin = ({ pin }) => {
  const { postedby, image, _id, destination } = pin;
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();
  const user = fetchUser();

  // !! is used to make return a boolean value
  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedby?._id === user?.sub
  );
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];
  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userid: user?.sub,
            postedby: {
              _type: "postedby",
              _ref: user?.sub,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        className="relative w-auto hover:shadow-lg cursor-zoom-in transition-all duration-500 overflow-hidden ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />
        {postHovered && (
          <div className="absolute w-full h-full top-0  flex flex-col justify-between">
            <div className="flex items-center mt-2 mx-2 justify-between">
              <div className="flex gap-2 p-1">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-8 h-8 rounded-full flex items-center justify-center  hover:opactiy-100 opacity-70"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 px-4 font-bold text-white py-1 rounded-3xl mr-1 opacity-70 hover:opacity-100"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 px-4 font-bold text-white py-1 rounded-3xl mr-1 opacity-70 hover:opacity-100"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex items-center justify-between my-2  w-full gap-5">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-5 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20
                    ? destination.slice(0, 12)
                    : destination}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pin;
