"use client";
import { useGlobalContext } from '@/context/globalContext';
import React, { useEffect } from 'react'
import { Separator } from "@/components/ui/separator";
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface EmployementTypeProps{
    "Full Time":string;
    "Part Time":string;
    Contract:boolean;
    Internship:boolean;
    Temporary:boolean;
}

function JobTitle() {
    const {
        handleTitleChange,
        jobTitle,
        activeEmployementTypes,
        setActiveEmployementTypes,
    }=useGlobalContext();
    const [employmentTypes,setEmployementTypes]=
     React.useState< EmployementTypeProps>({
        "Full Time":"",
        "Part Time":"",
        Contract:false,
        Internship:false,
        Temporary:false,
     });
     const handleEmployementTypeChange=(type : keyof EmployementTypeProps)=>{
        setEmployementTypes((prev)=>({...prev,[type]:!prev[type]}))
     };
useEffect(()=>{
  const selectedTypes=Object.keys(employmentTypes).filter((type)=>{
    return employmentTypes[type as keyof EmployementTypeProps];
  });
  setActiveEmployementTypes(selectedTypes);
},[employmentTypes])
return (
    <div className='p-6 flex flex-col gap-4 bg-background border border-border rounded-lg'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex-1'>
            <h3 className='text-lg font-semibold'>Job Title</h3>
            <Label
                htmlFor="jobTitle"
                className="text-sm text-muted-foreground mt-2"
            >A job title is a specific designation of a post in an organization.</Label>
        </div>
        <input type="text" id='jobTitle' value={jobTitle} onChange={handleTitleChange} className='flex-1 w-full mt-2 px-3 py-2 border border-border rounded-md'placeholder='Enter Job Title'/>
      </div>

      <Separator/>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold'>Employement Type</h3>
          <Label htmlFor='employementType' className='text-sm text-muted-foregroud mt-2'>
            Select the type of employement.
          </Label>
        </div>
        <div className='flex-1 flex flex-col gap-2'>
            {Object.entries(employmentTypes).map(([type,checked])=>(
                <div key={type} className='flex items-center space-x-2 border border-input rounded-md p-2'>
                  <Checkbox
                  id={type}
                  checked={checked}
                  onCheckedChange={()=>{
                    handleEmployementTypeChange(type as keyof EmployementTypeProps)
                  }}
                  />
                  <Label htmlFor={type} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    {type}
                    </Label>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default JobTitle
