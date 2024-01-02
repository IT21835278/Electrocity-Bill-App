import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages
import Login from './AuthPages/LoginPage/Login';

//meter reading
import SelectMeter from "./Pages/BillreaderPages/SelectMeter";
import BillRead from "./Pages/BillreaderPages/BillRead";
import ChangeUnitPrice from "./Pages/AdminPages/ChangeUnitPrice";

function App() {
  return (
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}></Route>



          {/* bill reading */}
          <Route path="/Select-reding" element={<SelectMeter/>} />
          <Route path="/reading-meter/:userId" element={<BillRead/>}/>


          {/* unit price */}
          <Route path="/Update-unit-prices" element={<ChangeUnitPrice/>} />
          
        </Routes>

      </BrowserRouter>
      
  );
}

export default App;
