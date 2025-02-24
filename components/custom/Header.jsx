import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";
import UserContext from '@/context/UserContext';
import Link from 'next/link';

const Header = () => {

  const { user, setUser } = useContext(UserContext);

  return (

    <div className='flex items-center p-4' style={{ justifyContent: "space-around" }}>
      <h1>Header</h1>

      <div className='flex gap-5'>
        <Link href={'/Home'} className='cursor-pointer'>Home</Link>
        <Link href={'/About'} className='cursor-pointer'>About</Link>
        <h1 className='cursor-pointer'>Contact</h1>
        <h1 className='cursor-pointer'>Feedback</h1>
      </div>


      <div className='gap-2 flex'>
        <Link href={'/Main'} className='cursor-pointer'>
          <Button variant="outline">New Project</Button>
        </Link>
        {!user &&
          <>
            <Button variant="outline">Sign In</Button>
            <Button variant="secondary">Sign Up</Button>
          </>
        }
      </div>
    </div>

  )
}

export default Header