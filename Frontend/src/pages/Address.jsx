import React, { useEffect } from "react";
import InputField from "../Components/InputField";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const { axios, navigate ,user} = useAppContext();
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { userId: user?._id, address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(()=>{
    if(!user){
      navigate("/cart")
    }
  },[])

  return (
    <div className="mt-16 pb-15 bg-primary min-h-screen">
      <p className="text-2xl md:text-3xl text-primary">
        Add Shipping
        <span className="text-accent-color font-semibold"> Address</span>
      </p>

      <div className="mt-10 flex flex-col-reverse md:flex-row gap-3">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-5 mt-5 text-sm">
            <InputField
              handleChange={handleChange}
              value={address}
              name="email"
              type="email"
              placeholder="Enter Email"
            />
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
              <InputField
                handleChange={handleChange}
                value={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                value={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputField
              handleChange={handleChange}
              value={address}
              name="street"
              type="text"
              placeholder="Enter Street"
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                handleChange={handleChange}
                value={address}
                name="city"
                type="text"
                placeholder="Enter City"
              />
              <InputField
                handleChange={handleChange}
                value={address}
                name="state"
                type="text"
                placeholder="Enter State"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                handleChange={handleChange}
                value={address}
                name="zipcode"
                type="number"
                placeholder="Enter Zip-Code"
              />
              <InputField
                handleChange={handleChange}
                value={address}
                name="country"
                type="text"
                placeholder="Enter Country"
              />
            </div>
            <InputField
              handleChange={handleChange}
              value={address}
              name="phone"
              type="text"
              placeholder="Enter Phone No"
            />
            <button className="w-full mt-5 bg-accent-color text-white py-3 hover:bg-accent-hover transition-all duration-300 cursor-pointer uppercase rounded-lg shadow-custom hover:shadow-custom-lg">
              Save Address
            </button>
          </form>
        </div>
        <img
          src="location.png"
          alt="location"
          className="md:mr-16 mb-16 mt:mt-0 w-100 h-100 object-contain"
        />
      </div>
    </div>
  );
};

export default Address;
