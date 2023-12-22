import { Navigate } from "react-router-dom";

const Protected = ({isUserAuthenticated, children})=>{
    console.log('Is user authenticated in Protected:', isUserAuthenticated);
    if(!isUserAuthenticated){
        return <Navigate to="/" replace />;
    }
    return children;
};

export default Protected;