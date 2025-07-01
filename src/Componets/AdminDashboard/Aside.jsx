import React from 'react'

const Aside = () => {
  return (
    <div className="bg-red-400 p-4 rounded-xl w-full lg:w-1/4 md:w-1/5 shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-white text-center">Actions</h2>
          <button className="btn btn-outline btn-success w-full" onClick={()=>{navigate('post-notification')}}>Post Notifications</button>
          <button className="btn btn-outline btn-success w-full" >View Jobs</button>
          <button className="btn btn-outline btn-success w-full">View Courses</button>
          <button className="btn btn-outline btn-success w-full">View Internships</button>
        </div>
  )
}

export default Aside
