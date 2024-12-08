import React, { useEffect, useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { Input } from "@/components/ui/input"
import { AI_PROMPT, SelectBudgetOptions,SelectTravelList } from "@/constants/options"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { chatSession } from "@/service/AIModal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseConfig"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom"

function CreateTrip() {
  const [place,setPlace]=useState();
  const [formData,setFromData]=useState([]);
  const [openDialog,setOpenDialog]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();


  const handleInputChange=(name,value)=>{
    setFromData({
      ...formData,
      [name]:value
    })
  }
  useEffect(()=>{ 
    console.log(formData)
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip = async()=>{
    const user = localStorage.getItem('user')
    if(!user){
      setOpenDialog(true)
      return ;
    }
    if(formData?.totalDays>5 || !formData?.location || !formData?.budget || !formData?.traveler){
      toast("Please fill all details!")
      return ;
    }
    toast("Form generated.");
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location)
    .replace('{totalDays}',formData?.totalDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)

    const result=await chatSession.sendMessage(FINAL_PROMPT);
    // console.log("--",result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  } 

  const SaveAiTrip=async(TripData) => {
    setLoading(true);
    const user=JSON.parse(localStorage.getItem("user"));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection:formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  }

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers: {
       Authorization: `Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp) => {console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Plan Your Perfect Trip ✨</h2>
        <p className="text-gray-500 text-lg">
          Tell us your preferences and let AI craft your ideal itinerary
        </p>
      </div>

      <div className="mt-12 space-y-8">
        <div className="space-y-3">
          <label className="text-lg font-medium">Where would you like to go?</label>
          <div className="relative">
            <GooglePlacesAutocomplete
              apiKey={"AIzaSyDUdnBEp-5kIq4MJgkCZJbB0GVsl0lNujA"}
              selectProps={{
                place,
                onChange: (v) => {setPlace(v); handleInputChange('location', v.label)},
                placeholder: "Search for a destination...",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    height: '44px',
                    borderRadius: '0.5rem',
                    borderColor: '#e5e7eb',
                    '&:hover': {
                      borderColor: '#d1d5db'
                    }
                  })
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-lg font-medium">Duration of your trip</label>
          <p className="text-sm text-gray-500">How many days would you like to explore?</p>
          <Input 
            type="number" 
            min="1" 
            max="5"
            placeholder="Enter number of days (max 5)" 
            className="h-11 text-base"
            onChange={(v) => handleInputChange('totalDays', v.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-lg font-medium">What's your budget range?</label>
            <p className="text-sm text-gray-500 mt-1">Select a budget category for activities and dining</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`
                  p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${formData?.budget === item.title 
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}
                `}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-lg font-medium">Who are you traveling with?</label>
            <p className="text-sm text-gray-500 mt-1">Select your travel companion type</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`
                  p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${formData?.traveler === item.people 
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}
                `}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Button 
          onClick={OnGenerateTrip} 
          disabled={loading}
          className="h-11 px-8 text-base"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
          ) : (
            'Generate My Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg"/>
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign In to the App with Google authentication securely</p>
              <Button 
              onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7"/>
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip
