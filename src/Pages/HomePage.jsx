import { useNavigate } from 'react-router';


const HomePage = () => {
    const navigate = useNavigate();
    return <>
    <h1>HomePage</h1>
    <button onClick={()=>{navigate ("/login")   }}>Login</button>
    <button onClick={()=>{navigate ("/register")   }}>Register</button>
    </>;
}
 
export default HomePage;