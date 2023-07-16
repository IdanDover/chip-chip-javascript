import { createContext, useContext } from "react";
import Card from "../../ui/Card";
import { convertSQLDateToNormalDate } from "../../utils/dates";

const CouponContext = createContext();

function Coupon({ coupon, children }) {
  //   const {
  //     category,
  //     title,
  //     description,
  //     startDate,
  //     endDate,
  //     image,
  //     price,
  //     amount,
  //   } = coupon;

  return (
    <CouponContext.Provider value={coupon}>
      <Card>{children}</Card>
    </CouponContext.Provider>
  );
}

function Base() {
  const { image, title, description, category } = useContext(CouponContext);

  return (
    <>
      <div className="w-full shadow-md rounded-3xl lg:max-w-sm">
        <img
          className="object-cover w-full h-48"
          src={image}
          alt="coupon image"
        />
      </div>
      <h1 className="px-3 py-2 font-mono text-2xl font-semibold text-gray-800 underline uppercase dark:text-gray-50">
        {title}
      </h1>
      <p className="px-3 py-2 font-mono text-gray-800 text-md dark:text-gray-50">
        {description}
      </p>
      <p className="px-3 py-2 font-mono text-lime-500 text-md dark:text-lime-300">
        Category: {category}
      </p>
    </>
  );
}

function Dates() {
  const { startDate, endDate } = useContext(CouponContext);

  return (
    <>
      <p className="px-3 pt-1 font-mono text-gray-800 text-md dark:text-gray-50">
        from {convertSQLDateToNormalDate(startDate)}
      </p>
      <p className="px-3 pb-2 font-mono text-red-500 text-md dark:text-red-200">
        to {convertSQLDateToNormalDate(endDate)}
      </p>
    </>
  );
}

Coupon.Base = Base;
Coupon.Dates = Dates;

export default Coupon;
