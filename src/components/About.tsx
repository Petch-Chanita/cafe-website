import img3 from "../assets/img/img9.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 pg-[#F8FAFD]">
      <img
        src={img3}
        alt="img"
        className="w-75 sm:w-[300px] lg:w-[500px] h-auto"
        loading="lazy"
      />

      <div className="space-y-4 lg:pt-14">
        <h1 className=" font-semibold text-4xl text-center md:text-start">
          Why Choose Us?
        </h1>

        <p>
          ☕ Premium Coffee – Handpicked beans, perfectly roasted for a rich and
          smooth taste. 🍰 Fresh Homemade Treats – Baked daily with love, no
          preservatives. 💖 Cozy & Welcoming Ambiance – A warm space to relax
          and enjoy. 📸 Instagrammable Spots – Beautiful corners for your
          perfect shot. Come and experience happiness in every cup at Yai Rak
          Café! 💕✨
        </p>
        <p>
          ☕ กาแฟพรีเมียม – คัดสรรเมล็ดคุณภาพ คั่วอย่างลงตัว 
          🍰 ขนมโฮมเมดสดใหม่
          – อบสดทุกวัน ปราศจากสารกันเสีย 💖 บรรยากาศอบอุ่น –
          มุมพักผ่อนแสนสบายที่คุณต้องหลงรัก 📸 มุมถ่ายรูปสวยๆ –
          ทุกมุมออกแบบให้มีเสน่ห์น่าถ่าย มาสัมผัสความสุขในทุกแก้วที่ ใยรักคาเฟ่!
          💕✨
        </p>
      </div>
    </div>
  );
};

export default About;
