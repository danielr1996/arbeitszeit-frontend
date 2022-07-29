import {FunctionComponent} from 'react';
import {Overview} from "./components/Overview";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoggedOut} from "./components/auth/LoggedOut";
import {Layout} from "./components/Layout";
import {Authenticated} from "./components/auth/Authenticated";
import {Settings} from "./components/Settings";

export const App: FunctionComponent = () => {
    return <>
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Authenticated><Page /></Authenticated>}/>
                    <Route path="/loggedout" element={<LoggedOut/>}/>
                </Routes>
            </BrowserRouter>
        </Layout>
    </>
}

const Page = ()=><>
    <Overview/>
</>
