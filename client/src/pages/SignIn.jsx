import React from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const {loading, error} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {



        e.preventDefault();
        
        try {
            dispatch(signInStart());
            const res = await fetch("/server/auth/signin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
              dispatch(signInFailure(data.message));
              return;
            }
            dispatch(signInSuccess(data));
            navigate("/");
          } catch (error) {
            dispatch(signInFailure(error.message));
          }
        
    }

    console.log(formData);

    return (
        <div className='max-w-lg mx-auto mt-12'>
            <h1 className='text-3xl font-semibold p-4 text-center'>Sign In</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input className = "border p-3 rounded-lg" type='text' placeholder='Email ID' id="email" onChange={handleChange}/>
                <input className = "border p-3 rounded-lg" type='password' placeholder='Password' id='password' onChange={handleChange}/>
                <button disabled={loading} className='bg-orange-200 p-3 rounded-lg uppercase hover:bg-orange-300 disabled:opacity-85'>
                    {loading ? "Loading..." : "Sign In"}
                </button>
            </form>

            <div className='mt-3 gap-2 flex'>
                <p>Don't have an Account ?</p>
                <span className=''><Link to='/sign-up' className='text-orange-600'>Sign Up</Link></span>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignIn