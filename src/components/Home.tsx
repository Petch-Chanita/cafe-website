import ImageBG from "../assets/img/bg1.jpg";
import { useCafe } from "../contexts/CafeContext";


const Home = () => {
  const { state } = useCafe();

  if (state.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <h1 className="text-red-500 text-4xl">{state.error}</h1>
      </div>
    );
  }


  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${state.validImage ? state.cafeData?.image_url : ImageBG})` }}
    >
      <div className="w-full flex lg:flex-col gap-20 justify-between items-center ">
        <div className="flex flex-col lg:flex-row gap-10">
          <h1 className="text-white font-semibold text-6xl lg:text-8xl uppercase text-center">
            {state.cafeData?.name_en || "Cafe Name Not Found"}
          </h1>
        </div>
        <div className="flex flex-col gap-10 lg:w-2/3 space-y-5 bg-textHead">
          <p className="text-white text-lg">
            {state.cafeData?.description_en || "No description available."}
          </p>
          <p className="text-white text-lg">{state.cafeData?.description_th}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
