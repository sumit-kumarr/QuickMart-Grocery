import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Login = () => {
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data && data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
        
      }else{
        toast.error(data.message)
      }

    } catch (error) {
        toast.error(error.message)
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-text-muted bg-black/50 backdrop-blur-sm"
    >
      <form
  onSubmit={onSubmitHandler}
  onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-text-muted rounded-xl shadow-custom-lg border border-custom bg-primary"
      >
        <p className="text-2xl font-medium m-auto text-primary">
          <span className="text-accent-color">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p className="text-primary font-medium">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-custom rounded-lg w-full p-3 mt-1 outline-accent-color bg-primary text-primary placeholder:text-muted"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p className="text-primary font-medium">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-custom rounded-lg w-full p-3 mt-1 outline-accent-color bg-primary text-primary placeholder:text-muted"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p className="text-primary font-medium">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-custom rounded-lg w-full p-3 mt-1 outline-accent-color bg-primary text-primary placeholder:text-muted"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p className="text-text-secondary">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-accent-color cursor-pointer hover:text-accent-hover transition-colors"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-text-secondary">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-accent-color cursor-pointer hover:text-accent-hover transition-colors"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-blue-500 hover:bg-blue-600 transition-all text-white w-full py-3 rounded-lg cursor-pointer font-medium shadow-custom hover:shadow-custom-lg">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
