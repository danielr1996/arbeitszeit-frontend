import {FunctionComponent, PropsWithChildren} from "react";
import {AuthProvider} from "react-oidc-context";
import {User} from "oidc-client-ts";

export const AuthWrapper: FunctionComponent<PropsWithChildren> = ({children})=>{
    const oidcConfig = {
        //@ts-ignore
        authority: window._env_.OAUTH_URL,
        //@ts-ignore
        client_id: window._env_.OAUTH_CLIENT_ID,
        redirect_uri: window.location.toString(),
        onSigninCallback: () => {
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            )
        },
        onRemoveUser: () => {
            console.log('user removed')
            window.location.pathname = "/loggedout"
        },
        automaticSilentRenew: true,
    }

    return <AuthProvider {...oidcConfig}>
        {children}
    </AuthProvider>
}

export const getToken = ()=>{
    //@ts-ignore
    const authority = window._env_.OAUTH_URL
    //@ts-ignore
    const clientId = window._env_.OAUTH_CLIENT_ID
    const oidcStorage = sessionStorage.getItem(`oidc.user:${authority}:${clientId}`)
    if (!oidcStorage) {
        return null;
    }
    return User.fromStorageString(oidcStorage).access_token
}
