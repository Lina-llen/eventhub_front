import { useState } from 'react';
import authServices from '../Services/authServices';


const LoginPage = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authServices.login(user);
            console.log(response);
        } catch (error) {
            
        }
    }

    return <>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Login</label>
        <input type ="text" name="username" id="username" value={user.login} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type ="password" name="password" id="password" value={user.password} onChange={handleChange} />
        <button type="submit">Se connecter</button>
    </form>
    </>;
}
 
export default LoginPage;