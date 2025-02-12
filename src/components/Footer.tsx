import { BsFacebook } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className=" bg-[#3e3425] text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">Yai Rak Café</h1>
          <div className="flex flex-col gap-2">
            <p>📍 Location</p>
            <p className=" text-sm">The café is located at...</p>
            <p>🕰 Opening Hours</p>
            <p className=" text-sm">Open daily from 09:00 AM - 06:00 PM</p>
          </div>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#home"
            >
              Home
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#recommend"
            >
              Recommend Menu
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#about"
            >
              About
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#menu"
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
              href="/#recommend"
            >
              Recommend Menu
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#dishes"
            >
              Our Dishes
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#drinks"
            >
              Our Drinks
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/#desserts"
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
              href="/"
            >
              YaiRakCafé@email.com
            </a>
            <a
              className="text-sm hover:text-[#A0764B] transition-all cursor-pointer"
              href="/"
            >
              +11 111 111 111
            </a>
            <a
              className="flex items-center gap-2 hover:text-[#A0764B] transition-all cursor-pointer"
              href="/"
            >
              <BsFacebook />
              <span className="text-sm">Yai Rak Café</span>
            </a>

            <a
              className="flex items-center gap-2 hover:text-[#A0764B] transition-all cursor-pointer"
              href="/"
            >
              <RiTwitterXFill />
              <span className="text-sm">Yai Rak Café</span>
            </a>

            <a
              className="flex items-center gap-2 hover:text-[#A0764B] transition-all cursor-pointer"
              href="/"
            >
              <BsInstagram />
              <span className="text-sm">Yai Rak Café</span>
            </a>
          </nav>
        </div>
      </div>
      <div>
        <p>
          <p className=" text-center py-4">
          © 2025 Yai Rak Café | All rights reserved
          </p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
