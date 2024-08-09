import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReimbursementContainer } from './Components/Reimbursement/ReimbursementContainer';
import { Login } from './Components/LoginRegister/Login';
import { Register } from './Components/LoginRegister/Register';
import { AddReimbursement } from './Components/Reimbursement/AddReimbursement';
import { UsersContainer } from './Components/User/UsersContainer';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
