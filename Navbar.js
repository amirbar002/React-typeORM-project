import React, {useState , useContext , useEffect} from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { UserContext } from './UserContext';
import Button from 'react-bootstrap/Button'



function Navbarwed() {
  const [bol , setbol] = useState(false)
  const { registerPage, setregisterPage } = useContext(UserContext);
  const {vacations , setvacations} = useContext(UserContext)
  const {abuts , setabuts} = useContext(UserContext)
  const { myvactions , setmyvactions} = useContext(UserContext)
  const {value , setValue} = useContext(UserContext);
  const {adminnavbar , setadminnavbar} = useContext(UserContext);
  const {isAdmin , setisAdmin} = useContext(UserContext);

      
  useEffect( () => {
    if(value === 1){
       return setbol(true)
    }
    return console.log('noo');
  },[]) 
        
    

  const Home = ( ) => {
    console.log('home');
    setabuts(false)
    setmyvactions(false)
    setadminnavbar(false)
    setvacations(true)
  }
  const Abuts = ( ) => {
    console.log('abuts');
    setvacations(false)
    setmyvactions(false)
    setadminnavbar(false)
    setabuts(true)
   
  }
  const MyVactions = () =>{
    console.log('MyVactions');
    setabuts(false)
    setvacations(false)
    setadminnavbar(false)
    setmyvactions(true)
  }

  const addcard = () => {
    setabuts(false)
    setvacations(false)
    setmyvactions(false)
    setadminnavbar(true)
  }

  return (
    <div>
         <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">your vacations</Navbar.Brand>
          <Nav className="me-auto">
          <Button variant="dark" onClick={Home} >Home</Button>
          <Button variant="dark" onClick={MyVactions} >my vacations</Button>
          <Button variant="dark" onClick={Abuts} >abuts</Button>
          {isAdmin && <Button variant="dark" onClick={addcard} >Add card</Button>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbarwed