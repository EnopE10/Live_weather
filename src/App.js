import React from 'react'
import './style.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';  

function First() {
  const [data,setData] = useState({
    celcius : '',
    name: '',
    humidity:'' ,
    speed: '',
    Image: ''
  })
  const [name, setname] = useState('');
  const [error, seterror] = useState('');
  
  const handleclick =() => {
    if(name !== ""){
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=90b715a4f0da68828125d242eec4cfc6&&units=metric`;
      axios.get(apiURL)
      .then (res=>{
        let imagepath = '';
        if(res.data.weather[0].main == "Clouds"){
          imagepath = "./images/cloudy.jpg"
        }
        else if(res.data.weather[0].main == "Clear"){
          imagepath = "./images/clear.jpg"
        }
        else if(res.data.weather[0].main == "Rain"){
          imagepath = "./images/rain.jpg"
        }
        else if(res.data.weather[0].main == "Snow"){
          imagepath = "./images/snow.jpg"
        }
        else if(res.data.weather[0].main == "Mist"){
          imagepath = "./images/mist.jpg"
        }
        else if(res.data.weather[0].main == "Drizzle"){
          imagepath = "./images/drizzle.jpg"
        }
        else{
          imagepath = "./images/cloudy.jpg"
        }


        console.log(res.data);
        setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity : res.data.main.humidity, speed : res.data.wind.speed, image : imagepath} )
        seterror('');
      })
      .catch(err => {
        if(err.response.status == 404){
          seterror("Invalid Name")
        } 
        else{
          seterror('');
        }
        console.log(err)
      });
    }
  }
  return (
    <div className='container'>
       <div className='weather'>
           <div className='search'>
               <input type='text' placeholder='Enter city' onChange={e => setname(e.target.value)} />
               <button><img src='/images/search.jpg ' onClick={handleclick}/>     </button>
           </div>
           <div className='error'>
            <p>{error}</p>
           </div>
           <div className='cloud'>
              <img src={data.image}></img>
              <h1>{Math.round(data.celcius)}°C</h1>
              <h2>{data.name}</h2>
              <div className='dets'>
                  <div className='col'>
                    <img src='/images/humidity.png'></img>
                    <div>
                      <p>{data.humidity}%</p>
                      <p>humidity</p>
                    </div>
                  <div className='col'>
                    <img src='/images/wind.jpg'></img>
                    <div>
                      <p>{data.speed} km/hr`</p>
                      <p>Wind</p>
                    </div>
                  </div>
              </div>
           </div>
       </div>
    </div>
    </div>
  )
}

export default First
