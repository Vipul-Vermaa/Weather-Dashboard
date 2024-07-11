import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Navbar from '../components/navbar/Navbar'
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { CircularProgress } from '@mui/material';

const savedCity = [
  {name: 'Pune'},
  {name: 'Mumbai'},
  {name: 'Delhi'},
  {name: 'Bangalore'},
  {name: 'Chennai'},
  {name: 'Lucknow'},
  {name: 'Agra'},
  {name: 'Rishikesh'},
  {name: 'Varanasi'},
  {name: 'Ayodhya'},
]


const SearchCities = () => {
  const [cities, setCities] = useState([])
  const [loading,setLoading] = useState(true)

  const weatherIcons = {
    Clear: <WbSunnyIcon />,
    Clouds: <CloudIcon />,
    Rain: <CloudQueueIcon />,
    Default: <CloudIcon />
  };

  useEffect(()=>{
    const fetchWeatherData=async()=>{
      const citiesData=await Promise.all(
        savedCity.map(async(city)=>{
          const apikey=import.meta.env.VITE_WEATHER_API_ID
          const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&APPID=${apikey}`)
          const data=await response.json()
          console.log(data)
          return {
            name: city.name,
            temp: `${data.main.temp}°C`,
            humidity: `${data.main.humidity}%`,
            wind: `${data.wind.speed} km/h`,
            condition: data.weather[0].main
          }
        })
      )
      setCities(citiesData)
      setLoading(false)
    }
    fetchWeatherData()
  },[])

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Box height={30} />
          <Grid container spacing={3} sx={{ height: '100vh' }}>
          {loading ? (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            ) : (
          
              cities.map((city, index) => (
                <Grid item xs={12} sm={6} md={2.4} key={index}>
                  <Card sx={{ height: '200px', width: '150px', border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)' }}>
                    <CardContent>
                      <Box display="flex" flexDirection='column' width={'100%'}>
                        <Typography variant="body1"><b>City:</b> {city.name}</Typography>
                        <Typography variant="body1"><b>Temp:</b> {city.temp}</Typography>
                        <Typography variant="body1"><b>Humidity:</b> {city.humidity}</Typography>
                        <Typography variant="body1"><b>Wind:</b> {city.wind}</Typography>
                        <Box mt={1}>
                        {weatherIcons[city.condition] || weatherIcons.Default}
                      </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default SearchCities



