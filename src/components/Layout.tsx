import {Breakpoint} from "./Breakpoint";
import {LogoutButton} from "./auth/LogoutButton";
import {Link} from "react-router-dom";

const navItems = [
    {id: 'overview', component: <Link to="/">Overview</Link>},
    {id: 'settings', component: <Link to="/settings">Settings</Link>},
    {id: 'logout', component: <LogoutButton/>},
]
export const Layout = (props: any)=>{
    return <>
        <div className="flex flex-col h-screen-min overscroll-none">
            <header className="flex-shrink-0 bg-slate-700">
                <nav>
                    <ul className="flex flex-row p-5 text-xl">
                        {navItems.map(({id, component})=><li className="mr-2" key={id}>{component}</li>)}
                    </ul>
                </nav>
            </header>
            <main className="flex-grow">
                {props.children}
            </main>
            <Breakpoint />
        </div>
    </>
}
