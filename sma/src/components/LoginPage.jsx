import React, { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "../features/slices/authSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

function LoginPage() {

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // const {isFetching, error, dispatch, user} = useContext(AuthContext); 
  const loginUser = (event) => {
    event.preventDefault();
    dispatch(handleLogin({email:email.current.value, password:password.current.value}));
  }

  function handleCreate(event) {
    event.preventDefault();
    navigate('/register')
  }

  return (
    <div className="flex flex-row h-screen w-screen justify-evenly bg-blue-50 items-center">
      <div className="w-[25rem] flex flex-col gap-7">
        <h1 className="text-5xl font-bold">Logo</h1>
        <p className="text-xl font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias,
          minus!
        </p>
      </div>
      <div className="w-[25rem] h-[18rem] p-5 bg-slate-100rounded-xl flex flex-col items-center  rounded-2xl justify-center bg-white">
        <form action="" className="gap-5 flex flex-col w-full items-center" onSubmit={(event) => loginUser(event)}>
          <input
            className="w-full border border-black text-sm rounded-xl focus:outline-none px-3 py-2"
            type="text"
            placeholder="Email"
            ref={email}
          />
          <input
            className="w-full border border-black text-sm rounded-xl focus:outline-none px-3 py-2 "
            type="password"
            placeholder="password"
            ref={password}
          />
          <button type="submit" className="bg-blue-500 w-full text-white px-2 py-1 rounded-lg font-semibold">
            Login
          </button>
          <p className="text-slate-400 text-base font-medium">New User?</p>
          <button className="bg-green-500 w-full text-white px-2 py-1 rounded-lg font-semibold"
          onClick={(event) => handleCreate(event)}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

