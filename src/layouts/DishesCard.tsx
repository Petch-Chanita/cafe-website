import React from "react";

const DishesCard = (props:any) => {
  return (
    <div className=" w-full lg:w-1/4 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <img className=" rounded-xl w-800 sm:h-130 lg:h-40 xl:h-50" src={props.img} alt="img" loading="lazy"/>
      <div className=" space-y-4">
        <h3 className=" font-semibold text-center text-xl pt-6">{props.title}</h3>

        <div className=" flex flex-row items-center justify-center gap-4">
          <h3 className=" font-semibold text-lg">{props.price}</h3>
          
        </div>
      </div>
    </div>
  );
};

export default DishesCard;