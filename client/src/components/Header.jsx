import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className='flex justify-evenly max-w-6xl bg-orange-200 p-3 mx-auto shadow-md items-center'>
                {/* left */}
                <Link to='/'>
                    <div className='flex justify-between items-center gap-1'>
                        <h1 className='text-sm sm:text-xl font-semibold'>Dream</h1>
                        <h1 className='text-xl font-extrabold'>House</h1>
                    </div>
                </Link>

                {/* center */}

                <div>
                    <form className='bg-orange-100 rounded-xl p-3 flex items-center'>
                        <input type="text" placeholder='Search.....' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                        <FaSearch className='text-orange-500 hover:text-orange-700'/>
                    </form>
                </div>

                {/* right */}

                <div >
                    <ul className='flex gap-4'>
                        <Link to="/">
                            <li className='hidden sm:inline text-orange-400 hover:underline'>Home</li>
                        </Link>

                        <Link to="/about">
                            <li className='hidden sm:inline text-orange-400 hover:underline'>About</li>
                        </Link>

                        <Link to="sign-in"> 
                            <li className='hidden sm:inline text-orange-400 hover:underline'>Sign In</li>
                        </Link>
                        
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header