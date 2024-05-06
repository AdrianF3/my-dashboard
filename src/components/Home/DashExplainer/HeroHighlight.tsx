import React from "react";
import Image from "next/image";

const HeroHighlight: React.FC = () => {
  // Dummy data for carousel items
  const carouselData = [
    {
      title: "Homepage",
      description: "Quick reminders, and general info to get started",
      image: "https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.16.54%E2%80%AFPM.png?alt=media&token=6f8d4637-719f-4c55-8bba-0c5702be0c30",
      tags: ["Weather", "Date/Time"]
    },
    {
      title: "Recipes",
      description: "Quick save PDFs of your favorite recipes",
      image: "https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.24.44%E2%80%AFPM.png?alt=media&token=f99fafa9-54ad-4c04-be63-e22b9021b60a",
      tags: ["Customizable", "Easily Shareable"]
    },
    { 
        title: "Habit Tracker",
        description: "Track your habits and keep yourself accountable",
        image: "https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.26.01%E2%80%AFPM.png?alt=media&token=44259cd2-d1f2-4ebc-9966-6925ca614707",
        tags: ["Daily, Weekly, Bi-Weekly, Monthly", "Easy Recording", "Track Your Progress"]
    },
    { 
        title: "Bookmarks",
        description: "Save your favorite links and easily access them",
        image: "https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.27.06%E2%80%AFPM.png?alt=media&token=86ab9824-b998-4e58-9693-f2c290f2d1a9",
        tags: ["Easily Customizable", "Perfect for Quick Access"] 
    },
    {
        title: "Personal Timelines",
        description: "Keep track of your life events and milestones",
        image: "https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FDALL·E%202024-04-19%2010.21.09%20-%20A%20simple%20and%20modern%20'Coming%20Soon'%20thumbnail%20graphic%20with%20a%20radiant%20background%20in%20shades%20of%20blue%20and%20green.%20The%20background%20features%20a%20subtle%20gradient%20t.jpeg?alt=media&token=4a7f36f4-080a-4cf3-8a15-1de22c62c698",
        tags: ["COMING SOON"]
    },
    {
        title: "Budget Tracker",
        description: "Keep track of your finances and spending habits",
        image: "https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FDALL·E%202024-04-19%2010.21.09%20-%20A%20simple%20and%20modern%20'Coming%20Soon'%20thumbnail%20graphic%20with%20a%20radiant%20background%20in%20shades%20of%20blue%20and%20green.%20The%20background%20features%20a%20subtle%20gradient%20t.jpeg?alt=media&token=4a7f36f4-080a-4cf3-8a15-1de22c62c698",
        tags: ["COMING SOON"]    
    }    
  ];


  return (
    <div className="hero min-h-screen w-full bg-base-500">      
      <div className="hero-content text-center flex-col overflow-hidden">
        <div className="w-10/12 mx-auto">
          <h1 className="text-5xl font-bold">Welcome to Dash!</h1>
          <p className="py-6">
            A simple collection of tools to help you organize your life, in a dash. Or think of it as a dashboard for managing your life. Dash. Get it? 😄
          </p>
        </div>

        <div className="w-10/12 bg-base-content/90 rounded-xl justify-items-center self-center">
        <div className="carousel carousel-center rounded-box p-4 max-w-md justify-items-center gap-2">
            {carouselData.map((item, index) => (
              <div key={index} className="carousel-item w-fit ">
                <div className="card bg-base-100 shadow-xl w-10/12">
                  <figure>
                    {/* <img src={item.image} alt={item.title} className="h-32 object-cover" />  */}
                    <Image 
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={300}                        
                        />
                  </figure>
                  <div className="card-body bg-success text-success-content">
                    <h2 className="card-title">{item.title}</h2>
                    <p>{item.description}</p>
                    <div className="card-actions flex flex-wrap">
                      {item.tags.map(tag => (
                        <div key={tag} className="badge badge-outline">{tag}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* End Carosuel */}
        <div className="hero">
                
        <div className="max-w-md text-center hero-content flex-col">
            <h1 className="text-5xl font-bold">Start Using Dash Today</h1>
            <p className="py-6">
                Get started by creating an account, or log in if you already have one. It&apos;s free!
            </p>          
        </div>
        </div>        
        <div className="badge badge-accent">demo available below</div>
      </div>
    </div>
  );
};

export default HeroHighlight;