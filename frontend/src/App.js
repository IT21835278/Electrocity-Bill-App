import {BrowserRouter, Routes, Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages
import Login from './AuthPages/LoginPage/Login';

function App() {
  return (
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}></Route>
        </Routes>

      </BrowserRouter>
      
  );
}

export default App;
