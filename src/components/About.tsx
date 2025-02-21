import { useEffect, useReducer } from "react";
import Image from "../assets/img/img9.png";
import { checkImageValid, getAboutByCafeID } from "../service/cafeService";
import { aboutReducer, initialAboutState } from "../contexts/aboutReducer";

const About = () => {
  const [state, dispatch] = useReducer(aboutReducer, initialAboutState);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const aboutData = await getAboutByCafeID(
          `${import.meta.env.VITE_APP_CAFE_ID}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: aboutData });

        if (aboutData?.image_url) {
          const isValid = await checkImageValid(aboutData.image_url);
          dispatch({ type: "SET_VALID_IMAGE", payload: isValid });
        }
      } catch (error: any) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }

    };
    fetchAbout();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 pg-[#F8FAFD]">
      <img
        src={state.validImage ? state.aboutData?.image_url : Image}
        alt="img"
        className="w-75 sm:w-[300px] lg:w-[500px] h-auto"
        loading="lazy"
      />

      <div className="space-y-4 lg:pt-14">
        <h1 className=" font-semibold text-4xl text-center md:text-start">
          Why Choose Us?
        </h1>
        <p>
          {state.aboutData?.about_en}
        </p>
        <p>
          {state.aboutData?.about_th}
        </p>
      </div>
    </div>
  );
};

export default About;
