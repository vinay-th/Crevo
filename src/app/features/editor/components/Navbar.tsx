'use client';
import React from 'react';
import { Logo } from './Logo';

const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-[64px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
    </nav>
  );
};

export default Navbar;
