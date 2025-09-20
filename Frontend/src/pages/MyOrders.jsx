import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const { currency, axios, user } = useAppContext();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/order/user");
      console.log("Orders API Response:", data); // Debug log
      if (data.success) {
        setOrders(data.order || []); // Ensure it's an array
      } else {
        console.log("API Error:", data.error);
        setError(data.error || "Failed to fetch orders");
        setOrders([]); // Set empty array on error
      }
    } catch (error) {
      console.log("Fetch Orders Error:", error);
      setError(error.response?.data?.error || error.message || "Failed to fetch orders");
      setOrders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
      setOrders([]);
      setError(null);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="mt-8 pb-15 bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-4">My Orders</div>
          <div className="text-text-muted">Loading your orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 pb-15 bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-4">My Orders</div>
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button 
            onClick={fetchOrders}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mt-8 pb-15 bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-4">My Orders</div>
          <div className="text-text-muted">Please log in to view your orders</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 pb-15 bg-primary min-h-screen">
      <div className="flex flex-col items-end gap-2 w-max mb-8">
        <span className="text-3xl font-bold text-primary">My Orders</span>
        <div className="w-16 h-0.5 bg-accent-color rounded-full"></div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center mt-8">
          <div className="text-text-muted text-lg">No orders found</div>
          <div className="text-text-muted">Your orders will appear here once you place them</div>
        </div>
      ) : (
        orders.map((order, index) => (
        <div
          key={index}
          className="border border-blue-400 rounded-lg mb-10 p-5 py-5 max-w-4xl bg-secondary shadow-custom"
        >
          <p className="flex justify-between md:items-center text-text-muted md:font-medium max-md:flex-col">
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>
              Total Amount : {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item) => (
            <div
              key={index}
              className={`relative text-text-muted ${
                order.items.length !== index + 1 && "border-b"
              } border-custom flex flex-col md:flex-row md:items-center justify-between p-4 py-5 nd:gap-16 w-full max-w-4xl`}
            >
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-blue-300 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt="img"
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4 ">
                  <h2 className="text-xl font-medium text-primary">
                    {item.product.name}
                  </h2>
                  <p className="text-text-muted">
                    Category:{item.product.category}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center md:ml-8 mb-4 md-mb-0">
                <p>Quantity : {item.quantity || "1"}</p>
                <p>Status:{order.status}</p>
                <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className="text-blue-500 text-lg font-bold">
                Amount : {currency}
                {item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
