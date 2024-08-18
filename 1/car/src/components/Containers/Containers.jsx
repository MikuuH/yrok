import { Box } from '@mui/material';

export default function Container({ children }) {
  return (
      <Box className="w-full min-h-screen bg-teal-700">
        {children}
      </Box>
  );
}