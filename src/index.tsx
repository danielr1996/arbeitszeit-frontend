import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import "./index.scss"
import {AuthProvider} from 'react-oidc-context';

const oidcConfig = {
    authority: 'https://sso.app.danielr1996.de/realms/arbeitszeit',
    client_id: 'arbeitszeit-frontend',
    redirect_uri: 'http://localhost:3000/',
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
            <App/>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
