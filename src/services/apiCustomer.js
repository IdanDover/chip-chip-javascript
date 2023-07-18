import { CUSTOMER_URL } from "./URLs";

export async function getCustomerDetails() {
  try {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(CUSTOMER_URL, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.description);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getCustomerUnsoldCoupons() {
  try {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(`${CUSTOMER_URL}/coupon/purchase`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.description);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function purchaseCoupon(couponId) {
  try {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(`${CUSTOMER_URL}/coupon/purchase/${couponId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.description);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export async function filterCouponsByCategory(category) {
  try {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(`${CUSTOMER_URL}/category?val=${category}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.description);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function filterCouponsByMaxPrice(price) {
  try {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(`${CUSTOMER_URL}/price?val=${price}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.description);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
