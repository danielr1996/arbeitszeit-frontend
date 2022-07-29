import {FunctionComponent} from "react";
import {useAuth} from "react-oidc-context";

export const LogoutButton: FunctionComponent = ()=>{
    const auth = useAuth();
    return <button onClick={()=>auth.signoutRedirect({post_logout_redirect_uri: 'http://localhost:3000/'})}>Logout</button>
}
