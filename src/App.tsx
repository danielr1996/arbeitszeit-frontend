import {FunctionComponent} from 'react';
import {Overview} from "./components/Overview";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Authenticated} from "./components/auth/Authenticated";
import {Settings} from "./components/Settings";

export const App: FunctionComponent = () => {
    return <>
        <Layout>
                <Routes>
                    <Route path="/" element={<Authenticated><Overview /></Authenticated>}/>
                    <Route path="/settings" element={<Authenticated><Settings /></Authenticated>}/>
                </Routes>
        </Layout>
    </>
}
