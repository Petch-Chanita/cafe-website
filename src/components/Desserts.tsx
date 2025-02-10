import React, { useEffect, useState } from "react";
import img1 from "../assets/img/dessert1.jpg";
import img2 from "../assets/img/dessert2.jpg";
import img3 from "../assets/img/dessert3.jpg";
import img4 from "../assets/img/dessert4.jpg";
import img5 from "../assets/img/dessert5.jpg";
import img6 from "../assets/img/dessert6.jpg";
import img7 from "../assets/img/dessert7.jpg";
import img8 from "../assets/img/dessert8.jpg";
import img9 from "../assets/img/dessert9.jpg";
import img10 from "../assets/img/dessert10.jpg";
import img11 from "../assets/img/menu1.jpg";
import DishesCard from "../layouts/DishesCard";

const Desserts = () => {
    const dessertsData = [
        { img: img1, title: "Dessert 1", price: "$10.99" },
        { img: img2, title: "Dessert 2", price: "$12.99" },
        { img: img3, title: "Dessert 3", price: "$10.99" },
        { img: img4, title: "Dessert 4", price: "$11.99" },
        { img: img5, title: "Dessert 5", price: "$10.99" },
        { img: img6, title: "Dessert 6", price: "$10.99" },
        { img: img7, title: "Dessert 7", price: "$10.99" },
        { img: img8, title: "Dessert 8", price: "$10.99" },
        { img: img9, title: "Dessert 9", price: "$10.99" },
        { img: img10, title: "Dessert 10", price: "$10.99" },
        { img: img11, title: "Dessert 11", price: "$12.99" },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
      const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
      
      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
       
        window.addEventListener("resize", handleResize);
    
     
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    
     
      const itemsPerPage = windowWidth >= 1024 ? 3 : 1; 
    
      
      const totalSlides = Math.ceil(dessertsData.length / itemsPerPage);
    
      
      const nextSlide = () => {
        if (currentIndex < totalSlides - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      };
    
 
      const prevSlide = () => {
        if (currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        }
      };
    
      
      const currentDishes = dessertsData.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
      );
    
  return (
    <div
      id="desserts"
      className=" min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 pg-[#F8FAFD]"
    >
      <h1 className=" text-4xl font-semibold text-center pt-24 pb-10">
        Our Desserts
      </h1>

      <div className="relative">
        <div className="flex flex-wrap gap-8 justify-center">
         
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

export default Desserts;
