import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';



function Header() {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setOpenDialog]=useState(false);

  
  useEffect(() =>{
    console.log(user)
  },[])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  
  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp) => {console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }

  return (
    <div className='bg-white/75 backdrop-blur-md border-b p-4 sticky top-0 z-50 flex justify-between items-center'>
      <img src='/logo.svg' className="h-8 w-auto"/>
      <div>
       {user ? 
       <div className='flex items-center gap-3'>
        <a href="/create-trip">
         <Button variant="ghost" className="rounded-full hover:bg-gray-100 transition-all">
           <span className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Create Trip
           </span>
         </Button> 
        </a>
        <a href="/my-trips">
         <Button variant="ghost" className="rounded-full hover:bg-gray-100 transition-all">
           <span className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
             My Trips
           </span>
         </Button> 
        </a>
         <Popover>
          <PopoverTrigger>
            <div className="p-2 rounded-full hover:bg-gray-100 transition-all">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-56 mt-2">
            <div className="flex flex-col gap-2 -mx-2 -my-1">
              <div className="px-2 py-1.5">
                <div className="font-medium text-sm">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <div className="h-px bg-gray-100 mx-2"></div>
              <button 
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => {
                  googleLogout();
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Logout
              </button>
            </div>
          </PopoverContent>
         </Popover>
       </div>
       : <Button onClick={() => setOpenDialog(true)} className="rounded-full">Sign In</Button>}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogDescription className="space-y-6 text-center">
              <div className="flex justify-center">
                <img src="/logo.svg" className="h-10 w-auto"/>
              </div>
              
              <div className="space-y-2">
                <h2 className="font-semibold text-2xl tracking-tight">Welcome back</h2>
                <p className="text-gray-500 text-sm">Sign in to your account to continue your journey</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">continue with</span>
                </div>
              </div>

              <Button 
                onClick={login} 
                variant="outline"
                className="w-full h-12 font-medium border-2 hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5 mr-2"/>
                Google
              </Button>

              <p className="text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <a href="/terms" className="underline hover:text-gray-800">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="underline hover:text-gray-800">Privacy Policy</a>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header
