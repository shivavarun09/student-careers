import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-6 space-y-10 bg-base-100 text-base-content">
      {/* Mission Section */}
      <div className='flex flex-col gap-2 mb-1 lg:flex-row'>
      <div className="p-6 shadow-md card bg-base-200">
        <h1 className="mb-2 text-2xl font-bold text-primary">🎯 Mission</h1>
        <p className="leading-relaxed text-justify">
          The goal of this project is to build a website using the skills I’ve acquired. 
          It is designed to help students stay updated on job opportunities, internships, 
          and skill development courses based on their interests by allowing them to register 
          and log in through a dedicated user dashboard. Additionally, the platform enables 
          colleges to post relevant jobs, internships, and courses tailored to students’ 
          degree specializations using an admin dashboard feature.
        </p>
      </div>

      {/* Who I Am Section */}
      <div className="p-6 shadow-md card bg-base-200">
        <h1 className="text-2xl font-bold text-primary">👨‍💻 Who I Am</h1>
        <p className="mb-4 leading-relaxed text-justify">
          My name is Shivavarun, and I am a Computer Science student with a strong interest in web 
          development and data analytics. I have learned HTML, CSS, JavaScript, Firebase, and 
          Firestore, and I wanted to apply these skills by building a meaningful project. 
          With the goal of creating something useful, I decided to develop a web application 
          designed to help students stay updated on jobs, internships, and skill development 
          opportunities.
        </p>
        <p className="leading-relaxed text-justify">
          During the development process, I also explored and learned Tailwind CSS and the 
          DaisyUI plugin to enhance the design and user experience of the app.
        </p>
      </div>
</div>
      {/* Contact Section */}
      <div className="items-center justify-center p-4 card ">
        <h1 className="mb-4 text-2xl font-bold text-primary">📬 Contact Me</h1>
        <div className="flex flex-wrap gap-4 ">
          <a href="mailto:varunapps09@gmailcom" className='no-underline btn btn-outline btn-primary'>Email</a>
          <a href="mailto:varunapps09@gmailcom" className='no-underline btn btn-outline btn-primary'>instagram</a>
          <a href="mailto:varunapps09@gmailcom" className='no-underline btn btn-outline btn-primary'>x(twitter)</a>
      
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
