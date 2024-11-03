import React from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import { useState } from 'react';

const SignUp = () => {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {



        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/server/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
    
            });
    
            const data = await res.json();

            if(data.success === false){
                
                setError(data.message);
                setLoading(false);
                return;
                
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in');
               
            
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.log(error);
            
        }
        
        
    }

    console.log(formData);

    return (
        <div className='max-w-lg mx-auto mt-12'>
            <h1 className='text-3xl font-semibold p-4 text-center'>Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input className = "border p-3 rounded-lg" type='text' placeholder='User Name' id='username' onChange={handleChange}/>
                <input className = "border p-3 rounded-lg" type='text' placeholder='Email ID' id="email" onChange={handleChange}/>
                <input className = "border p-3 rounded-lg" type='password' placeholder='Password' id='password' onChange={handleChange}/>
                <button disabled={loading} className='bg-orange-200 p-3 rounded-lg uppercase hover:bg-orange-300 disabled:opacity-85'>
                    {loading ? "Loading..." : "Sign Up"}
                </button>
            </form>

            <div className='mt-3 gap-2 flex'>
                <p>Have an Account ?</p>
                <span className=''><Link to='/sign-in' className='text-orange-600'>Sign In</Link></span>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignUp