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
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
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
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Recipes</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Weather</div> 
                            <div className="badge badge-outline">Date/Time</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Habit Tracking */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Habit Tracking</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Weather</div> 
                            <div className="badge badge-outline">Date/Time</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Bookmarks */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Bookmarks</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Weather</div> 
                            <div className="badge badge-outline">Date/Time</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Timeline */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Timeline</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Weather</div> 
                            <div className="badge badge-outline">Date/Time</div>
                            <div className="badge badge-outline">COMING SOON</div>
                        </div>
                    </div>
                </div>
            </div> 
            {/* Budget */}
            <div className="carousel-item">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Budget</h2>
                        <p>Quick reminders, and general info to get started</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Weather</div> 
                            <div className="badge badge-outline">Date/Time</div>
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
            Get started by creating an account, or log in if you already have one. It's free!
          </p>          
        </div>
        </div>
             


        </div>
      </div>
    </div>
  );
};

export default HeroHighlight;
