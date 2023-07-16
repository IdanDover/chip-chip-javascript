import { toast } from "react-hot-toast";
import { CUSTOMER_URL } from "./backend";

export async function getCustomerDetails() {
  try {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    const res = await fetch(CUSTOMER_URL, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch {
    toast.error("Failed to fetch your data");
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

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch {
    toast.error("Failed to filter");
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

    if (!res.ok) throw Error();

    const data = await res.json();
    return data;
  } catch {
    toast.error("Failed to filter");
  }
}
