import { Button } from '@/components/ui/button'
import Lookup from '@/data/Lookup'
import React from 'react'

const page = () => {

    return (

        <div className='p-12 w-full'>
            <h2 className='text-3xl text-center'>Pricing</h2>
            <p className='text-center mt-2'>{Lookup.PRICING_DESC}</p>
            <div className='flex gap-5 mt-12'>
                {Lookup.PRICING_OPTIONS.map((option, index) => (
                    <div className='w-1/4 flex flex-col gap-3 p-5 bg-gray-900' key={index}>
                        <h1 className='text-2xl font-bold'>{option.name}</h1>
                        <h5>{option.tokens} Tokens</h5>
                        <p>{option.desc}</p>
                        <hr></hr>
                        <h2 className='text-center p-8'>$<span className='text-3xl'>{option.price}</span>/month</h2>
                        <Button variant="outline">Subscribe</Button>
                    </div>
                ))}
            </div>
        </div>

    )

}

export default page