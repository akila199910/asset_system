import React, { useState } from "react";
import { login } from "../../Api/AuthenticationApi/AuthenticationApi.jsx";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await login(userName, password);
      alert(response.message);
      // Handle successful login, like saving user data or redirecting
      navigate("/admin/admin-dashboard");
    } catch (err) {
      setError(err.message || "Login failed, please try again.");
    }
  };
  return (
    <div className="px-10 py-2 bg-white border-2 border-gray-100 rounded-3xl">
      <form onSubmit={handleLoginFormSubmit}>
        <h1 className="text-5xl font-semibold">Welcome Back </h1>
        <p className="mt-4 text-lg font-medium text-gray-500">
          please Enter your credentials
        </p>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
              placeholder="Enter your email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="mt-4 text-red-500">{error}</p>}

          <div className="flex items-center justify-between mt-8">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 text-base font-medium" for="remember">
                Remember for 30 days
              </label>
            </div>
            <button className="text-base font-medium text-violet-500">
              Forgot Password
            </button>
          </div>
          <div className="flex flex-col mt-8 gap-y-4">
            <button className="py-3 text-white text-l g active:scale-[.98] bg-violet-500 rounded-3xl">
              Sign in
            </button>
            <button className="py-3 text-white text-l g active:scale-[.98] bg-violet-500 rounded-3xl">
              Sign in with Google{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
