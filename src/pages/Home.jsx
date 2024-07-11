import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Box from '@mui/material/Box';
import Navbar from '../components/navbar/Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import { LineChart } from '../components/dashboard/Chart';
import ForecastCard from '../components/Forecast';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';


const Home = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forecastData,setForecastData]=useState([])
  const [city,setCity]=useState('Pune')

  const weatherIcons = {
    Clear: <WbSunnyIcon />,
    Clouds: <CloudIcon />,
    Rain: <CloudQueueIcon />,
    Default: <CloudIcon />
  };

  const fetchWeatherData=async(city)=>{
    setLoading(true)
    try{
      const apikey=import.meta.env.VITE_WEATHER_API_ID
      const weatherResponse=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}`)
      const weatherData=await weatherResponse.json()
      setCurrentWeather(weatherData)

      const forecastResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&APPID=${apikey}`)
      const forecastData=await forecastResponse.json()
      setForecastData(forecastData.list)
    }catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchWeatherData(city)
  },[city])

  const handleSearch = (searchQuery) => {
    setCity(searchQuery);
  };

    return (
        <>
        <Navbar onSearch={handleSearch} />
        <Box height={70} />
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component='main' sx={{ flexGrow: 1, p: 3  }}>
          {loading ? (
            <Typography variant="h5" component="div">Loading...</Typography>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Card sx={{border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'}} >
                    <CardContent sx={{border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'}}>
                      <Typography variant="h5" component="div">
                        Weather Update  Of:
                        <Box sx={{ ml: 2 }}> <Typography variant="h4"><b> {currentWeather.name} </b> </Typography> </Box>
                      </Typography>
                     
                      
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                    {weatherIcons[city.condition] || weatherIcons.Default }
                        <Box sx={{ ml: 2 }}><Typography variant="body1"><b>Temperature:</b> {currentWeather.main.temp}°C</Typography></Box>
                        <Box sx={{ ml: 2 }}> <Typography variant="body1"><b>Humidity:</b> {currentWeather.main.humidity}%</Typography> </Box>
                        <Box sx={{ ml: 2 }}> <Typography variant="body1"><b>Wind Speed:</b> {currentWeather.wind.speed} km/h</Typography> </Box>
                        <Box sx={{ ml: 2 }}> <Typography variant="body1"><b>Weather Description:</b> {currentWeather.weather[0].description}</Typography> </Box>
                    </Box>
                  
                    </CardContent>
                  </Card>
              </Grid>
            </Grid>
          )}
            <Box height={30} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card sx={{border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'}}>
                  <CardContent sx={{border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'}}>
                    <Typography variant="h5" component="div">
                      <h3>Temperature Trends</h3>
                    </Typography>
                    <LineChart forecastData={forecastData} />
                  </CardContent>
                </Card>
              </Grid>              
            </Grid>
            <Grid>
            <Grid item xs={6} p={'2rem'}>
                <ForecastCard forecastData={forecastData} /> 
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    )
}

export default Home
