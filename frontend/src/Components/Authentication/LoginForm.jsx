import React, { useState } from "react";

export const LoginForm = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: userName,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", requestOptions);
      const result = await response.json();
      console.log(result);
      // Handle the response (e.g., store user data, redirect, show errors, etc.)
    } catch (error) {
      console.error("Error during login:", error);
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
