import {FunctionComponent} from "react";
import {useAuth} from "react-oidc-context";

export const LoginButton: FunctionComponent = ()=>{
    const auth = useAuth();
    return <button onClick={()=>auth.signinRedirect()}>Login</button>
}
