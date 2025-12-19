"use client"
import Header from '@/components/Header'
import JobForm from '@/components/JobPost/JobForm'
import { useGlobalContext } from '@/context/globalContext'
import { useRouter } from 'next/navigation';
import React,{useEffect} from 'react'

function Page() {

    const {isAuthenticated,loading}=useGlobalContext();
    const router=useRouter();
    // Redirect to login if not authenticated
    useEffect(()=>{
      if(!loading && !isAuthenticated)
      {
        router.push("http://localhost:8000/login");
      }
    },[isAuthenticated]);
  return (
    <div className='flex flex-col'>
      <Header/>
      <h2 className='flex-1 pt-8 pl-20 mx-auto-w-[90%] text-3xl font-bold text-black'>
        Create a Job Post
      </h2>
      <div className='flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center'>
        <JobForm/>
      </div>
    </div>
  )
}

export default Page
