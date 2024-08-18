import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Link } from 'react-router-dom';

export default function Routers() {
  const [value, setValue] = useState(0);

  return (
    <Box className="flex justify-center items-center h-[10vh]">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }} 
        className="w-1/2 rounded-xl shadow-lg"
      >
        <BottomNavigationAction label="CARS" icon={<CarRentalIcon />} component={Link} to="/" />
        <BottomNavigationAction label="ADD" icon={<DirectionsCarFilledIcon />} component={Link} to="/add" />
      </BottomNavigation>
    </Box>
  );
}
