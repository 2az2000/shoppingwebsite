"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchBar() {
    const searchParams = useSearchParams()
    const [search, setSearch] = useState("")
    const router = useRouter()
    function handleSearch(){
        const currentSearchParams = new URLSearchParams(searchParams.toString())
        currentSearchParams.set("title", search)
        console.log(currentSearchParams.toString());
        
        router.push(`/store?${currentSearchParams.toString()}`)
    }
  return (
    <div className='flex gap-2 justify-center items-center my-5 w-fit mx-auto'>
        <input className='border-2 border-gray-300 rounded-md p-2' onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' />
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={handleSearch}>Search</button>
    </div>
  )
}
