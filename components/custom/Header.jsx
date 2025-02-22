import React, { useContext } from 'react'
import { Button } from "@/components/ui/button";
import UserContext from '@/context/UserContext';

const Header = () => {

  const { user, setUser } = useContext(UserContext);

  return (

    <div className='flex justify-between items-center p-4'>
      <h1>Header</h1>

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