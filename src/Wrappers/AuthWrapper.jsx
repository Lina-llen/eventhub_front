import AuthContext from "../Contexts/AuthContext"
import { useContext } from "react"
import LoginPage from "../Pages/LoginPage";


const AuthWrapper = ({ children }) => {
    const {isConnected} = useContext(AuthContext);
    
    
    return <>
        {isConnected ?
        children
        :
        <LoginPage />}
    </>;
}


export default AuthWrapper; 