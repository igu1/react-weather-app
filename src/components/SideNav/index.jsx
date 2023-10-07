import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import routes from "../../routes";
import { Link } from "react-router-dom";

function SideNav({ setContent, content }) {
  const [showSideNav, setShowSideNav] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1130) {
        setShowSideNav(false);
      } else {
        setShowSideNav(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {showSideNav && (
        <div className="side-nav w-1/6 bg-white fixed h-full rounded-3xl p-4 cursor-pointer">
          <div className="flex justify-center align-middle gap-2 my-5">
            <img src={Logo} alt="logo" className="w-10 h-10" />
            <h1 className="text-xl text-center my-auto">My Weather App</h1>
          </div>
          <br />
          {routes.map((route) => (
            <Link to={route.path} key={route.id}>
              <SideBarTile icon={route.icon} text={route.text} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default SideNav;

function SideBarTile(props) {
  return (
    <div className="flex gap-2 w-full h-16 rounded-2xl bg-purple-100 my-3">
      <div className="w-1/4 m-2 bg-white rounded-3xl flex justify-center items-center">
        {props.icon}
      </div>
      <div className="w-3/4 m-2 flex justify-start items-center">
        <p className="font-bold">{props.text}</p>
      </div>
    </div>
  );
}