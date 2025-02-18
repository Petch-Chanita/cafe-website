import ImageBG from "../assets/img/bg1.jpg";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${ImageBG})` }}
    >
      <div className="w-full flex lg:flex-col gap-20 justify-between items-center ">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* w-full lg:w-1/3 space-y-5 */}
          <h1 className="text-white font-semibold text-6xl lg:text-8xl">YAI RAK CAFÉ</h1>
          {/* <div>
          <Button className="rounded-5xl bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
            Save changes
          </Button>
        </div> */}
        </div>
        <div className="flex flex-col gap-10 lg:w-2/3 space-y-5 bg-textHead">
          <p className="text-white text-lg">
            Come and experience the warmth of "Yai Rak Café", where you can
            enjoy the perfect cup of coffee and a cozy atmosphere. Visit us
            today! 💕✨
          </p>
          <p className="text-white text-lg">
            มาสัมผัสความละมุนของ "ใยรักคาเฟ่"
            และเติมเต็มวันของคุณด้วยกาแฟหอมกรุ่นและบรรยากาศดี ๆ ได้แล้ววันนี้!
            💕✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
