import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const msg = document.getElementById('msg');

  async function handleRegister(event) {
    event.preventDefault();
    if(password.current.value !== passwordAgain.current.value) {
      msg.innerHTML = "password don't match";
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        await axios.post('http://localhost:8000/api/auth/register', user);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
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
      <div className="w-[25rem] h-[22rem] p-5 bg-slate-100rounded-xl flex flex-col items-center gap-5 rounded-2xl justify-center bg-white">
        <form action="" className="flex gap-3 flex-col w-full" onSubmit={(event) => handleRegister(event)}>
          <input
            className="w-full border border-black text-sm rounded-xl focus:outline-none px-3 py-2"
            type="text"
            placeholder="username"
            required
            ref={username}
          />
          <input
            className="w-full border border-black text-sm rounded-xl focus:outline-none px-3 py-2"
            type="email"
            placeholder="Email"
            required
            ref={email}
          />
          <input
            className="w-full border border-black text-sm rounded-xl focus:outline-none px-3 py-2 "
            type="password"
            placeholder="password"
            required
            ref={password}
            minLength={6}
          />
          <input
            className="w-full border border-black text-sm rounded-xl focus:outline-none px-3 py-2 "
            type="password"
            placeholder="password again"
            required
            ref={passwordAgain}
          />
          <p id="msg" className="text-red-600 font-semibold text-sm font-monospace">

          </p>
          <button
            className="bg-blue-500 w-full text-white px-2 py-1 rounded-lg font-semibold"
            type="submit"
          >
            Sign in
          </button>
          <button
            className="bg-green-500 w-full text-white px-2 py-1 rounded-lg font-semibold"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
