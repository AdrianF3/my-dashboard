import React from "react";

const HeroHighlight: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-500">
      <div className="hero-content text-center flex-col">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Dash!</h1>
          <p className="py-6">
            A simple collection of tools to help you organize your life, in a dash. Or think of it as a dashboard for managing your life. Dash. Get it? 😄
          </p>          
        </div>
        <div>        
  
            {/* Carosuel */}
            <div className="w-full flex justify-center"> {/* Center the carousel and limit its width */}
          <div className="carousel w-full max-w-5xl gap-3 overflow-x-auto"> {/* Control width and overflow */}                        
            {/* Homepage */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure>
                        <img src="https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.16.54%E2%80%AFPM.png?alt=media&token=6f8d4637-719f-4c55-8bba-0c5702be0c30" alt="Shoes" />
                    </figure>
                    <div className="card-body bg-success text-info-content">
                        <h2 className="card-title">Homepage</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Weather</div> 
                            <div className="badge badge-outline">Date/Time</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Recipes */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.24.44%E2%80%AFPM.png?alt=media&token=f99fafa9-54ad-4c04-be63-e22b9021b60a" alt="Shoes" /></figure>
                    <div className="card-body bg-success text-info-content">
                        <h2 className="card-title">Recipes</h2>
                        <p>Quick save pdfs of your favorite recipes</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Customizeable</div> 
                            <div className="badge badge-outline">Easily Shareable</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Habit Tracking */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.26.01%E2%80%AFPM.png?alt=media&token=44259cd2-d1f2-4ebc-9966-6925ca614707" alt="Shoes" /></figure>
                    <div className="card-body bg-success text-info-content">
                        <h2 className="card-title">Habit Tracking</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Daily, Bi-Weekly, Weekly, Monthly </div> 
                            <div className="badge badge-outline">Record Easily</div>
                            <div className="badge badge-outline">Track Your Progress</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Bookmarks */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/HomeHighlights%2FScreenshot%202024-04-17%20at%203.27.06%E2%80%AFPM.png?alt=media&token=86ab9824-b998-4e58-9693-f2c290f2d1a9" alt="Shoes" /></figure>
                    <div className="card-body bg-success text-info-content">
                        <h2 className="card-title">Bookmarks</h2>
                        <p>Easily organize your favorite websites or links</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Easily Customizeable</div> 
                            <div className="badge badge-outline">Options for Privacy</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Timeline */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body bg-success text-info-content">
                        <h2 className="card-title">Timeline</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">                            
                            <div className="badge badge-outline">COMING SOON</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Budget */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body bg-success text-info-content">
                        <h2 className="card-title">Budget</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">                            
                            <div className="badge badge-outline">COMING SOON</div>
                        </div>
                    </div>
                </div>
            </div> 


            
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
             


        </div>
      </div>
    </div>
  );
};

export default HeroHighlight;
