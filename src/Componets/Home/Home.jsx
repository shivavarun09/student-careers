import React from "react";
import "./Home.css";
import { Carousel } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate= useNavigate();
  return (
    <div className="p-4 mb-2 ">
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
        {/* Left Image Section */}
        <div className="w-full lg:w-2/4">
          <img
            src="student.jpg"
            alt="student-img"
            className="w-full rounded-md"
          />
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col items-start justify-center w-full px-4 text-left lg:w-2/4 lg:items-center lg:text-center">
          <h3 className="mb-2 text-2xl font-bold text-blue-500">
            Level Up Your Career with Real Opportunities
          </h3>
          <p className="text-gray-600">
            Find Jobs, Internships & Skill Courses Tailored Just For You
          </p>
          <div className="flex space-x-2">
            <button className="btn btn-primary" onClick={()=>{navigate('/signup')}}>Register Now</button>
            <button className="btn btn-primary" onClick={()=>{navigate('login')}}>Login</button>
          </div>
        </div>
      </div>
      {/* {Courosal} */}
  
      <div className="flex flex-col items-center justify-center p-4 space-y-3 rounded-md">
        <h3 className="mb-2 text-2xl font-bold text-blue-500">
Get started to explore what we offer.
          </h3>
        <Carousel className="w-4/4">
          <Carousel.Item interval={1000}>
            <img src="job.jpeg" alt="job-image" />
            <Carousel.Caption>
              <h3>Jobs</h3>
              <p>You can view jobs by signing up and logging in through the User Dashboard</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img src="internship.jpeg" alt="internship-image" />
            <Carousel.Caption>
              <h3>Internships</h3>
              <p>You can view internships by signing up and logging in through the User Dashboard</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="courses.jpeg" alt="courses-image" />
            <Carousel.Caption>
              <h3>Skill Courses</h3>
              <p>
                You can view skill development courses by signing up and logging in through the User Dashboard
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="ai.jpeg" alt="ai-image" />
            <Carousel.Caption>
              <h3>Ai Assistent</h3>
              <p>
                Create an account to use our AI helper
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
