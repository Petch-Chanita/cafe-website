
const DishesCard = (props: any) => {
  return (
    <div className=" w-full pb-20 sm:w-100 sm:h-100 lg:w-1/4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg">
      <div className="w-full h-60 xl:h-80 2xl:h-full 2xl:w-full">
        <img
          className=" rounded-xl h-60 w-800 lg:h-40 xl:h-2/4 2xl:h-3/4"
          src={props.img}
          alt="img"
          loading="lazy"
        />
        <div className=" space-y-4">
          <h3 className=" font-semibold text-center text-xl pt-6">
            {props.title}
          </h3>

          <div className=" flex flex-row items-center justify-center gap-4">
            <h3 className=" font-semibold text-lg">{props.price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishesCard;
