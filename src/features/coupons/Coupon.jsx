import { createContext, useContext } from "react";
import Card from "../../ui/Card";
import { convertSQLDateToNormalDate } from "../../utils/dates";
import Button from "../../ui/Button";
import usePurchase from "../customer/usePurchase";
import Modal from "../../ui/Modal";
import { FaCartShopping, FaPen, FaTrashCan } from "react-icons/fa6";
import UpdateCouponForm from "../company/UpdateCouponForm";
import useDeleteCoupon from "../company/useDeleteCoupon";

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
      <p className="px-3 py-2 font-mono text-sm text-gray-500 dark:text-gray-400">
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

function Price() {
  const { price, amount } = useContext(CouponContext);

  return (
    <>
      <p className="px-3 pt-1 font-mono text-gray-800 text-md dark:text-gray-50">
        only {amount} left
      </p>
      <p className="px-3 pb-2 font-mono text-lime-500 text-md dark:text-lime-200">
        now only {price}&#36;
      </p>
    </>
  );
}

function Purchase() {
  const { purchase, isLoading } = usePurchase();
  const { id, price } = useContext(CouponContext);

  return (
    <Modal>
      <Modal.Open opens="purchase">
        <div className="px-3 py-2 ml-auto">
          <Button
            variation="round"
            onClick={() => {
              return;
            }}
          >
            <FaCartShopping />
          </Button>
        </div>
      </Modal.Open>
      <Modal.Window name="purchase">
        <div className="px-3 py-2 ml-auto">
          <p className="px-3 py-2 font-mono text-gray-800 text-md dark:text-gray-50">
            Are you sure you want to purchase this coupon?
          </p>
          <p className="px-3 py-4 font-mono text-gray-800 text-md dark:text-gray-50">
            It will cost you{" "}
            <span className="text-lime-500 dark:text-lime-100">
              {price}&#36;
            </span>
          </p>
          <Button
            variation="round"
            onClick={() => purchase(id)}
            disabled={isLoading}
          >
            yes
          </Button>
        </div>
      </Modal.Window>
    </Modal>
  );
}

function Edit() {
  const { remove, isLoading } = useDeleteCoupon();
  const coupon = useContext(CouponContext);

  return (
    <Modal>
      <div className="flex items-center justify-end">
        <Modal.Open opens="update">
          <div className="px-3 py-2">
            <Button
              variation="round"
              onClick={() => {
                return;
              }}
            >
              <FaPen />
            </Button>
          </div>
        </Modal.Open>
        <Modal.Open opens="delete">
          <div className="px-3 py-2">
            <Button
              variation="round"
              onClick={() => {
                return;
              }}
            >
              <FaTrashCan />
            </Button>
          </div>
        </Modal.Open>
      </div>
      <Modal.Window name="update">
        <UpdateCouponForm coupon={coupon} />
      </Modal.Window>
      <Modal.Window name="delete">
        <div className="px-3 py-2 ml-auto">
          <p className="px-3 py-2 font-mono text-gray-800 text-md dark:text-gray-50">
            Are you sure you want to delete this coupon?
          </p>
          <p className="px-3 py-4 font-mono text-red-800 text-md dark:text-red-300">
            These changes are permanent
          </p>
          <Button
            variation="round"
            onClick={() => remove(coupon.id)}
            disabled={isLoading}
          >
            yes
          </Button>
        </div>
      </Modal.Window>
    </Modal>
  );
}

Coupon.Base = Base;
Coupon.Dates = Dates;
Coupon.Price = Price;
Coupon.Purchase = Purchase;
Coupon.Edit = Edit;

export default Coupon;
