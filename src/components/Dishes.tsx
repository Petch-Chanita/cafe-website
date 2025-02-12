import { useEffect, useState } from "react";
import img1 from "../assets/img/dishes1.jpg";
import img2 from "../assets/img/dishes2.jpg";
import img3 from "../assets/img/dishes3.jpg";
import img4 from "../assets/img/dishes4.jpg";
import img5 from "../assets/img/dishes5.jpg";
import img6 from "../assets/img/dishes6.jpg";
import img7 from "../assets/img/dishes7.jpg";
import img8 from "../assets/img/dishes8.jpg";
import DishesCard from "../layouts/DishesCard";
import { AnimatePresence, motion } from "framer-motion";

const Dishes = () => {
  const dishesData = [
    { img: img1, title: "Tasty Dish 1", price: "$10.99" },
    { img: img2, title: "Tasty Dish 2", price: "$12.99" },
    { img: img3, title: "Tasty Dish 3", price: "$10.99" },
    { img: img4, title: "Tasty Dish 4", price: "$11.99" },
    { img: img5, title: "Tasty Dish 5", price: "$10.99" },
    { img: img6, title: "Tasty Dish 6", price: "$12.99" },
    { img: img7, title: "Tasty Dish 7", price: "$10.99" },
    { img: img8, title: "Tasty Dish 8", price: "$12.99" },
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
  const itemsPerPage = windowWidth >= 1600 ? 5 : windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1; 

  // Calculate the total number of slides
  const totalSlides = Math.ceil(dishesData.length / itemsPerPage);

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
  const currentDishes = dishesData.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <div id="dishes" className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 pg-[#F8FAFD]">
      <h1 className="text-4xl font-semibold text-center pt-24 pb-10">
        Our Dishes
      </h1>

      <div className="relative p-15 w-full flex justify-center">
        {/* Slide Container */}
        <div className="overflow-hidden w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="flex gap-8 justify-center"
              initial={{ opacity: 0 }} // เริ่มจากโปร่งใส
              animate={{ opacity: 1 }} // ค่อยๆ ปรากฏ
              exit={{ opacity: 0 }} // ค่อยๆ จางหาย
              transition={{ duration: 0.2, ease: "easeInOut" }} // ตั้งเวลาค่อยๆ โชว์
            >
              {currentDishes.map((dish, index) => (
                <DishesCard key={index} img={dish.img} title={dish.title} price={dish.price} />
              ))}
            </motion.div>
          </AnimatePresence>
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

export default Dishes;
