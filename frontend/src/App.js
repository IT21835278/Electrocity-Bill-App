import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

//pages
import Login from './AuthPages/LoginPage/Login';

//meter reading
import SelectMeter from "./Pages/BillreaderPages/SelectMeter";
import BillRead from "./Pages/BillreaderPages/BillRead";
import ChangeUnitPrice from "./Pages/AdminPages/ChangeUnitPrice";
import ViewMonthBill from "./Pages/CustomerPages/ViewMonthBill";
import Paybill from "./Pages/CustomerPages/Paybill";
import ViewUnitRate from "./Pages/CustomerPages/viewUnitrates";
import MeterHistory from "./Pages/CustomerPages/MeterHistory";
import PaymentHistory from "./Pages/CustomerPages/PaymentHistory";
import CusromerLayout from "./Components/Layout/CustomerLayout";

axios.defaults.withCredentials = true;

function App() {
  return (
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          {/* auth path */}
          <Route path="/" element={<Login/>}></Route>



          {/* bill reading */}
          <Route path="/Select-reding" element={<SelectMeter/>} />
          <Route path="/reading-meter/:userId" element={<BillRead/>}/>
          <Route path="/meter-history" element={<CusromerLayout><MeterHistory/></CusromerLayout> }  />


          {/* unit price */}
          <Route path="/Update-unit-prices" element={<ChangeUnitPrice/>} />
          <Route path="/view-unit-rate" element={<CusromerLayout><ViewUnitRate/></CusromerLayout> } /> 

          {/* customer paths */}
          <Route path="/view-bill" element={<CusromerLayout><ViewMonthBill/></CusromerLayout>} />


          {/* payment */}
          <Route path="/pay-bill/:userId" element={<CusromerLayout><Paybill/></CusromerLayout>} />
          <Route path="/payment-history" element={<CusromerLayout><PaymentHistory/></CusromerLayout>} />
          
        </Routes>

      </BrowserRouter>
      
  );
}

export default App;
