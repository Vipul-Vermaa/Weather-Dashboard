import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { getDays } from './dashboard/Chart';

const ForecastCard = ({ forecastData }) => {
  const dayLabels = getDays();
 

  return (
    
    <Card sx={{border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'}}>
      <CardContent sx={{border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'}}>
        <Typography variant="h5" component="div">
          <h3>7-Day Forecast</h3>
        </Typography>
        <Box>
          <Grid container spacing={2}>
            {forecastData.map((day, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1"><b>{dayLabels[index]}</b></Typography>
                  <Typography variant="body2"><b>Temperature:</b> {day.main.temp}°C</Typography>
                  <Typography variant="body2"><b>Humidity:</b> {day.main.humidity}%</Typography>
                  <Typography variant="body2"><b>Wind Speed:</b> {day.wind.speed} km/h</Typography>
                  <Typography variant="body2"><b>Condition:</b> {day.weather[0].description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
