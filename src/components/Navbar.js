import React from 'react';
import { FaApple } from 'react-icons/fa';
import { IoArrowBack, IoSearch } from 'react-icons/io5';
import { PiShare } from 'react-icons/pi';
import { TbSettingsFilled } from 'react-icons/tb';
import './Navbar.css';
import { BsDot } from 'react-icons/bs';

export default function Navbar() {
  return (
    <div className='cutom-navbar'>
      <div className='left-aligned-nav-items'>
        <button className='nav-btn'><IoArrowBack /></button>
        <button className='nav-btn apple-btn'><FaApple /></button>
        <div className='apple-text-div'>
          <span className='apple-text'>Apple</span>
          <div className='apple-text-caption-div'>
            <span className='apple-text-caption'>5 boards</span>
            <span ><BsDot className='dot' /></span>
            <span className='apple-text-caption'>24 members</span>
          </div>
        </div>
      </div>
      <div className='right-aligned-nav-items'>
        <div className='search-div'>
          <span><IoSearch /></span>
          <input type='search' placeholder='Search' />
        </div>
        <button className='nav-btn'><PiShare /></button>
        <button className='nav-btn'><TbSettingsFilled /></button>
      </div>
    </div>
  )
}
