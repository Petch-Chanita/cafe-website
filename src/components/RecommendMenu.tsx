import DishesCard from "../layouts/DishesCard";
import menu1 from "../assets/img/menu1.jpg";
import menu2 from "../assets/img/dishes3.jpg";
import menu3 from "../assets/img/drink8.jpg";

const RecommendMenu = () => {
  const recommendData = [
    { img: menu1, title: "Honey Toast", price: "$16.99" },
    { img: menu2, title: "Khao Soi", price: "$18.99" },
    { img: menu3, title: "Drink 1", price: "$10.99" },
  ];
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 pg-[#F8FAFD]">
      <h1 className=" text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">
        Recommend Menu
      </h1>

      <div className=" flex flex-wrap gap-8 justify-center">
        {recommendData.map((img, idx) => (
          <DishesCard key={idx} img={img.img} title={img.title} price={img.price} />
        ))}
      </div>
    </div>
  );
};

export default RecommendMenu;
