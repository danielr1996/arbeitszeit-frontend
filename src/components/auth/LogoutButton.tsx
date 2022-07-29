import {FunctionComponent} from "react";
import {useAuth} from "react-oidc-context";

export const LogoutButton: FunctionComponent = ()=>{
    const auth = useAuth();
    return <button onClick={()=>auth.removeUser()}>Logout</button>
}
