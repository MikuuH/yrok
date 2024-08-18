import AddCar from "./components/AddCar/AddCar";
import Cars from "./components/Cars/Cars";
import Containers from "./components/Containers/Containers";
import Routers from "./components/Routes/Routers";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
      <Router>
        <Containers>
            <Routers />
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/add" element={<AddCar />}/>
        </Routes>
        </Containers>
      </Router>
      
  )
}