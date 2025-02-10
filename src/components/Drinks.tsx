import React, { useEffect, useState } from "react";
import img1 from "../assets/img/drink8.jpg";
import img2 from "../assets/img/drink1.jpg";
import img3 from "../assets/img/drink2.jpg";
import img4 from "../assets/img/drink3.jpg";
import img5 from "../assets/img/drink4.jpg";
import img6 from "../assets/img/drink5.jpg";
import img7 from "../assets/img/drink7.jpg";
import DishesCard from "../layouts/DishesCard";

const Drinks = () => {
  const drinksData = [
    { img: img1, title: "Drink 1", price: "$10.99" },
    { img: img2, title: "Drink 2", price: "$12.99" },
    { img: img3, title: "Drink 3", price: "$10.99" },
    { img: img4, title: "Drink 4", price: "$11.99" },
    { img: img5, title: "Drink 5", price: "$10.99" },
    { img: img6, title: "Drink 6", price: "$12.99" },
    { img: img7, title: "Drink 7", price: "$10.99" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State for window width

  // Update windowWidth whenever the window resizes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener to track window size changes
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine items per page based on screen size
  const itemsPerPage = windowWidth >= 1024 ? 3 : 1; // 3 items on larger screens, 1 item on mobile

  // Calculate the total number of slides
  const totalSlides = Math.ceil(drinksData.length / itemsPerPage);

  // Function to handle the next slide
  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle the previous slide
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Calculate the dishes to display for the current slide
  const currentDishes = drinksData.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div id="drinks" className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 pg-[#F8FAFD]">
      <h1 className=" text-4xl font-semibold text-center pt-24 pb-10">
        Our Drinks
      </h1>

      <div className="relative">
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Display dishes with appropriate layout based on screen size */}
          {currentDishes.map((dish, index) => (
            <DishesCard
              key={index}
              img={dish.img}
              title={dish.title}
              price={dish.price}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentIndex === 0}
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full ${
            currentIndex === totalSlides - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={currentIndex === totalSlides - 1}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Drinks;
