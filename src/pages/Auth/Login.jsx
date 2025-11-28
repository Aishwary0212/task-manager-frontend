import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {updateUser}=useContext(UserContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if(role==="admin"){
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };
  
  
  
  return (
    <AuthLayout>
      <div className="w-full h-auto mt-10 md:mt-0 flex flex-col justify-center px-4 md:px-8">
        <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
        <p className="text-sm text-slate-600 mt-1 mb-6">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="abc@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && <p className="text-red-500 text-xs -mt-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium shadow active:scale-[0.98] transition"
          >
            LOGIN
          </button>

          <p className="text-sm text-center text-slate-700">
            Don’t have an account?{" "}
            <Link className="font-semibold text-primary" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );

}

export default Login