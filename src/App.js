import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminLogin from "./Components/Administrative/Administrative/AdminLogin"
import Dashboard from "./Components/Administrative/Administrative/Dashboard"
import Home from "./Components/Userinterface/Home";
import Home1 from "./Components/Userinterface/Home1";
import VehicleDetails from "./Components/Userinterface/MyComponent/VehicleDetails";
import VehicleComponentDetails from "./Components/Userinterface/MyComponent/VehicleComponentDetails";
import PaymentGateway from "./Components/Userinterface/MyComponent/PaymentGateway"
import Payment from "./Components/Administrative/Payment/Payment"
 
function App() {
  return (
    <div>
     <Router>
      <Routes>
         <Route element={<AdminLogin />} path="/adminlogin" />
         <Route element={<Dashboard />} path="/dashboard/*" />
         <Route element={<Home />} path="/home" />
         <Route element={<Home1 />} path="/subscription" />
         <Route element={<VehicleDetails />} path="/vehicle" />
         <Route element={<VehicleComponentDetails />} path="/vehicledetails" />
         <Route element={<PaymentGateway />} path="/paymentgateway" />
         <Route element={<Payment />} path="/payment" />
        </Routes>
      </Router>           
    </div>
    
  );
}

export default App;
