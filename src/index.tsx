import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import "./index.scss"
import {AuthProvider} from 'react-oidc-context';
import {BrowserRouter} from 'react-router-dom';

//@ts-ignore
const oidcConfig = {
    //@ts-ignore
    authority: window._env_.OAUTH_URL,
    client_id: 'arbeitszeit-frontend',
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
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
