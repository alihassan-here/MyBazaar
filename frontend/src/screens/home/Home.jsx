import React from "react";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import Categories from "../../components/home/Categories";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Slider />
      </div>
      <div className="my-container mt-[70px]">
        <Categories />
      </div>
    </>
  );
};

export default Home;
