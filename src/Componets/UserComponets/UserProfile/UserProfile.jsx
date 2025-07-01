import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '../../../Auth/FirebaseConfig/FirebaseConfig'

const UserProfile = () => {
  useEffect(()=>{
    const getCurrentUser=async()=>{
      const user = auth.currentUser;
    if(user){
      console.log(user.email)
      console.log(user.displayName)
    }
    }
    getCurrentUser()
  },[])
  return (
    <div>
      <h1>User Profile</h1>
      <div className="avatar online">
  <div className="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>
    </div>
  )
}

export default UserProfile
