import  React, { useState } from 'react'
import {UserContext } from './UserContext';
import Registration from './Registration'
import  Navbarwed from './Navbar';
import './App.css';
import SingIn from './SingIn';
import Vacatinos from './Vacatinos';
import Welcome from './Welcome';
import Abuts from './Abuts';
import MyVactions from './MyVactions';
import Addcard from './Addcard';
import ChangeCard from './ChangeCard';


function App() {
  const [value , setValue] = useState(1)
  const [welcomePage, setwelcomePage] = useState(false) //show;
  const [registerPage, setregisterPage] = useState(false) //hide
  const [singInPage, setsingInPage] = useState(false)//hide;
  const [vacations, setvacations] = useState(true)//hide;
  const [navbar, setnavbar] = useState(true)//hide;
  const [abuts, setabuts] = useState(false)//hide;
  const [myvactions, setmyvactions] = useState(false)//hide;
  const [isAdmin, setisAdmin] = useState(true)//hide;
  const [adminnavbar, setadminnavbar] = useState(false)//hide;
  const [changecard, setchangecard] = useState(false)//hide;
  const [idChange, setidChange] = useState(1)//hide;



  return (
    <div className="App">
      <UserContext.Provider value={{value , setValue, 
        registerPage , setregisterPage , 
        singInPage , setsingInPage , 
        vacations , setvacations ,
        welcomePage , setwelcomePage,
        navbar ,setnavbar,
        abuts,setabuts,
        myvactions , setmyvactions,
        isAdmin ,setisAdmin,
        adminnavbar, setadminnavbar,
        changecard , setchangecard ,
        idChange , setidChange}}>
     {navbar && <Navbarwed/>}
     { changecard && <ChangeCard/>}
    { welcomePage && <Welcome/>}
    { adminnavbar&& <Addcard/>}
      {registerPage && <Registration/>}
    {singInPage && <SingIn/>}
      {vacations && <Vacatinos/>}
     {myvactions && <MyVactions/>}
   
    {abuts &&  <Abuts/>}
      </UserContext.Provider>
    </div>
  );
}

export default App;
