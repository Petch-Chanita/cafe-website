import { BsFacebook } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";
import { useCafe } from "../contexts/CafeContext";
import { formatTime } from "../utils/FormatTime";


const Footer = () => {
   const { state } = useCafe();
   
  return (
    <div className=" bg-[#3e3425] text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">{state.cafeData?.name_en}</h1>
          <div className="flex flex-col gap-2">
            <p>📍 Location</p>
            <p className=" text-sm">The café is located at {state.cafeData?.address_en}</p>
            <p>🕰 Opening Hours</p>
            <p className=" text-sm">Open daily from {formatTime(state.cafeData?.opening_time)} - {formatTime(state.cafeData?.closing_time)}</p>
          </div>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL + "#home"}
            >
              Home
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#recommend"}
            >
              Recommend Menu
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#about"}
            >
              About
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#menu"}
            >
              Menu
            </a>
            
            
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Menu</h1>
          <nav className=" flex flex-col gap-2">
            
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#recommend"}
            >
              Recommend Menu
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#dishes"}
            >
              Our Dishes
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#drinks"}
            >
              Our Drinks
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "#desserts"}
            >
              Our Desserts
            </a>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "/"}
            >
              {state.cafeData?.email}
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "/"}
            >
              {state.cafeData?.phone}
            </a>
            <a
              className="flex items-center gap-2 hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "/"}
            >
              <BsFacebook />
              <span className="text-sm">{state.cafeData?.facebook}</span>
            </a>

            <a
              className="flex items-center gap-2 hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "/"}
            >
              <RiTwitterXFill />
              <span className="text-sm">{state.cafeData?.x}</span>
            </a>

            <a
              className="flex items-center gap-2 hover:text-[#A0764B] transition-all cursor-pointer"
              href={import.meta.env.BASE_URL+ "/"}
            >
              <BsInstagram />
              <span className="text-sm">{state.cafeData?.instagram}</span>
            </a>
          </nav>
        </div>
      </div>
      <div>
          <p className=" text-center py-4">
          © 2025 {state.cafeData?.name_en} | All rights reserved
          </p>
      </div>
    </div>
  );
};

export default Footer;
