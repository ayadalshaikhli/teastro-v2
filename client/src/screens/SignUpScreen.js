import React, { useRef } from 'react'
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();


  const register = (e) => {
    e.preventDefault();
    const loginUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("http://localhost:5000/auth/register", loginUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.error === "User already exists") {
          alert("User already exists");
        } else if (res.data.message === "User created") {
          alert("User created");


        }
      }
      )
      .catch((err) => {
        console.log(err);
      }
      );
  }

  const signIn = (e) => {
    e.preventDefault();
    const loginUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("http://localhost:5000/auth/login", loginUser)
      .then((res) => {
        console.log(res.data);
        if (res.data.error === "User does not exist") {
          alert("User does not exist");
        } else if (res.data.error === "Invalid password") {
          alert("Invalid password");
        } else if (res.data.message === "Login successful") {
          console.log(res.data.email, res.data.id)
          dispatch(login(res.data.email));

        }
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <div>
      <form className='flex flex-col items-center justify-center space-y-5'>
        <h1 className='text-3xl font-bold'>Sign In</h1>
        <input className='w-1/2 h-10 rounded-md px-2 text-black' ref={emailRef} type="email" placeholder='Email Address' />
        <input className='w-1/2 h-10 rounded-md px-2 text-black' ref={passwordRef} type="password" placeholder='Password' />
        <button className='w-1/4 h-10 rounded-md bg-red-500' onClick={signIn}>Sign In</button>
        <h4>
          <span className='text-gray-400'>New to Netflix? </span>
          <span className='text-red-500' onClick={register}>Sign Up now.</span>
        </h4>
      </form>

    </div>
  )
}

export default SignUpScreen