import React, { useEffect, useState } from "react";
import axios from 'axios';
import { UserProfile } from '../../../types/UserProfile.types';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaPooStorm } from 'react-icons/fa'; // Example icons
import { GiRaining } from "react-icons/gi";
import './DashboardStyles.css';

const Dashboard: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    const [weatherData, setWeatherData] = useState<any>(null);
  
    // Define dateData in your component's state
    const [dateData, setDateData] = useState<{
      date: string;
      time: string;
      dayOfWeek: string;
      timeOfDay: string;
      currentMonth: string;
      currentYear: string;
      dayOfTheYear: number;
    }>({
      date: '',
      time: '',
      dayOfWeek: '',
      timeOfDay: '',
      currentMonth: '',
      currentYear: '',
      dayOfTheYear: 0,
    });

  useEffect(() => {
    let key = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
    if (profile && profile.zipCode && key) {
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${profile.zipCode},US&appid=${key}&units=imperial`;
      axios.get(apiURL)
        .then(response => {
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }, [profile]);

    
      

  // Function to select an icon based on weather condition
  function selectWeatherIcon(condition: string) {
    switch (condition) {
      case 'Clear': return <FaSun className="text-5xl text-yellow-500" />;
      case 'Rain': return <FaCloudRain className="text-5xl text-blue-500" />;
      case 'Drizzle': return <FaCloudRain className="text-5xl text-blue-300" />;
      case 'Snow': return <FaSnowflake className="text-5xl text-blue-300" />;
      case 'Thunderstorm': return <FaPooStorm className="text-5xl text-gray-700" />;
      case 'Mist': return <GiRaining  className="text-5xl text-gray-400" />;
      case 'Fog': return <GiRaining  className="text-5xl text-gray-400" />;
      case 'Clouds': return <FaCloud className="text-5xl text-gray-500" />;
      default: return <FaCloud className="text-5xl text-gray-400" />;
    }
  }

  // Calculate 'timeOfDay' based on current time or another logic
  // Here, just an example placeholder
  const timeOfDay = 'morning'; // This should be dynamically calculated as per your logic

  // Safely computing weatherIcon and backgroundClass
  const weatherIcon = weatherData && weatherData.weather ? selectWeatherIcon(weatherData.weather[0].main) : null;
  const backgroundClass = weatherData && weatherData.weather ? `weather-background ${timeOfDay.toLowerCase()} ${weatherData.weather[0].main.toLowerCase()}` : 'weather-background';

  
  
  
    // attempt using useEffect
    useEffect(() => {    
    

    
    // if weather data for current city not already loaded,     
    let key = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

    // **  research better way to check against null
    if (profile && profile.zipCode && key) {
    //   let apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[currentCityIndex].lat}&lon=${cityData[currentCityIndex].lon}&units=imperial&appid=${key}`      
        
            // let apiURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${profile.zipCode},{US}&appid=${key}`
          // For current weather data by ZIP code
            let apiURL = `https://api.openweathermap.org/data/2.5/weather?zip=${profile.zipCode},US&appid=${key}&units=imperial`;

            axios.get(apiURL)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });                   
    }          
  }, [])



    useEffect(() => {
        const currentDate = getCurrentDate();
        setDateData(currentDate);
    }, []);

    // Calculate the day of the year
    function getDayOfYear(date: Date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        return day;
    }

    // set the current date for display, with an object containing four values
    // the date in DD/MM/YY format, the time in ##:## am/pm format, the day of the week, and
    // wether is is early morning, morming, afternoon, evening, or night

    function getCurrentDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });
        const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
        const currentYear = currentDate.getFullYear().toString();
        const dayOfTheYear = getDayOfYear(currentDate);

        let timeOfDay = '';
        const currentHour = currentDate.getHours();
        if (currentHour >= 0 && currentHour < 6) {
            timeOfDay = 'early morning';
        } else if (currentHour >= 6 && currentHour < 12) {
            timeOfDay = 'morning';
        } else if (currentHour >= 12 && currentHour < 14) {
            timeOfDay = 'afternoon';
        } else if (currentHour >= 14 && currentHour < 18) {
            timeOfDay = 'early evening';
        } else if (currentHour >= 18 && currentHour < 22) {
            timeOfDay = 'evening';
        } else {
            timeOfDay = 'night';
        }

        

        return {
            date: formattedDate,
            time: formattedTime,
            dayOfWeek: dayOfWeek,
            timeOfDay: timeOfDay,
            currentMonth: currentMonth,
            currentYear: currentYear,
            dayOfTheYear: dayOfTheYear,
        };
    }

    

    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center p-4">
                    {/* Date/Time & Weather Card */}
            <div className="card w-full h-fit bg-base-100 shadow-xl image-full">                
                <div className="card-body flex flex-col md:flex-row justify-between">
                    {/* Date Time Section */}
                    <div className='flex flex-col sm:w-full md:w-1/3'>   
                        <h2 className="text-3xl">{dateData.dayOfWeek}</h2>
                        <p>{ dateData.time + ' | ' } <span className="uppercase">{dateData.timeOfDay}</span></p>
                        <div className="pt-4 flex flex-col">
                        <p>{ dateData.currentMonth + ' ' + dateData.date }</p>
                            <p>Day { dateData.dayOfTheYear + ' | ' + dateData.currentYear }</p>
                        </div>
                    </div>
                    {/* Weather Section */}
                    <div className={`${backgroundClass} text-center p-2 h-fit rounded-xl shadow-primary-content shadow-md sm:w-full md:w-1/3`}>
                        {weatherData ? (
                            <>
                                <div className="weather-icon flex flex-col items-center">
                                    {weatherIcon}
                                    <h2 className="text-3xl">
                                        {weatherData.weather[0].main} | {Math.round(weatherData.main.temp)}°F
                                    </h2>
                                </div>
                                <p>
                                    Today&apos;s Range: {Math.round(weatherData.main.temp_min)}°F to {Math.round(weatherData.main.temp_max)}°F
                                </p>
                                <p>
                                    Feels Like: {Math.round(weatherData.main.feels_like)}°F
                                </p>
                                <div className="pt-4 flex flex-col">
                                    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                                    {weatherData.rain && <><div className="flex flex-row gap-2 items-center">
                                    <FaCloudRain /><p>Rain: {weatherData.rain['1h']} mm in the last hour</p>
                                        </div>
                                    </> }
                                    {weatherData.snow && <><div className="flex flex-row gap-2 items-center">
                                        <FaSnowflake /><p>Snow: {weatherData.snow['1h']} mm in the last hour</p> 
                                        </div>
                                    </>}

                                    {/* Collapsable Area */}
                                    <details className="collapse collapse-arrow bg-neutral-content text-info my-4">
                                        <summary className="collapse-title self-center font-medium text-black uppercase">details</summary>
                                        <div className="collapse-content text-sm text-info-content"> 
                                            <p>Cloudiness: {weatherData.clouds.all} % </p>
                                            <p>Wind Speed: {Math.round(weatherData.wind.speed)} ft/s</p>
                                            <p>Humidity: {weatherData.main.humidity}%</p>
                                            <p>Pressure: {weatherData.main.pressure} hPa</p>
                                            <p>Visibility: {weatherData.visibility} meters</p>
                                            <p>Longitude: {weatherData.coord.lon}</p>
                                            <p>Latitude: {weatherData.coord.lat}</p>
                                            <p>Reported At: {new Date(weatherData.dt * 1000).toLocaleString()}</p>
                                        </div>
                                    </details>
                                </div>
                                {/* Details Snippet */}
                                <div className="flex flex-col justify-center text-center text-primary-content">
                                    <p className="text-sm">Data from OpenWeatherMap.org</p>
                                </div>
                            </>
                        ) : <>
                            <div className="justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        </>}
                    </div>

                </div>
            </div>   
            
        
                  
        </div>
    );
};

export default Dashboard;
