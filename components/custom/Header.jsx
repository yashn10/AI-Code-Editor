import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";
import UserContext from '@/context/UserContext';
import Link from 'next/link';

const Header = () => {

  const { user, setUser } = useContext(UserContext);

  return (

    <div className='flex justify-between items-center p-4'>
      <h1>Header</h1>

      <div className='flex gap-5'>
        <Link href={'/Home'} className='cursor-pointer'>Home</Link>
        <Link href={'/About'} className='cursor-pointer'>About</Link>
        <h1 className='cursor-pointer'>Contact</h1>
        <h1 className='cursor-pointer'>Feedback</h1>
      </div>

      {!user &&
        <div className='gap-2 flex'>
          <Button variant="outline">Sign In</Button>
          <Button variant="secondary">Sign Up</Button>
        </div>
      }
    </div>

  )
}

export default Header