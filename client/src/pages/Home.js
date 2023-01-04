import './Home.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
        <div className='wrapper'>
            <p className='text'>Log into your account to use the app. If you don't have one yet, you can create one right now!</p>
            <div className='links'>
            <Link to='/login' className='link-wrapper'>Log In</Link>
            <Link to='/signin' className='link-wrapper'>Sign In</Link>
            </div>
        </div>
    </main>
  )
}
