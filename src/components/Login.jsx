import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    const data = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(data));
    const { sub, name, picture } = data;
    const doc = {
      _id: sub,
      _type: "user",
      username: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          loop
          controls={false}
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute  inset-0 gap-5 flex flex-col items-center justify-center ">
        <img src={logo} alt="logo" className="130px" />
        <GoogleLogin
          auto_select
          useOneTap
          onSuccess={(res) => responseGoogle(res)}
          onError={() => console.log("Something went wrong")}
        />
      </div>
    </div>
  );
};

export default Login;
