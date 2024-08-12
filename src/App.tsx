import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReimbursementContainer } from './Components/Reimbursement/ReimbursementContainer';
import { Login } from './Components/LoginRegister/Login';
import { Register } from './Components/LoginRegister/Register';
import { AddReimbursement } from './Components/Reimbursement/AddReimbursement';
import { UsersContainer } from './Components/User/UsersContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [color, setColor] = useState("bluew")
  const styleObj = {
    backgroundColor: color
  }

  return (
    <div className="App" style={styleObj}>
      <BrowserRouter>
        <Routes>
            <Route path='' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/reimbursements' element={<ReimbursementContainer/>}/>
            <Route path='/addreimbursement' element={<AddReimbursement/>}/>
            <Route path='/users' element={<UsersContainer/>}/>
            <Route path='/allreimbursements' element={<ReimbursementContainer/>}/>
            <Route path='/pendingreimbursements' element={<ReimbursementContainer/>}/>
            <Route path='/allpendingreimbursements' element={<ReimbursementContainer/>}/>

        </Routes>
      </BrowserRouter>

      <ToastContainer/>
    </div>
  );
}

export default App;
