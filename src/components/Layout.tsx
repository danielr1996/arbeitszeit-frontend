import {Breakpoint} from "./Breakpoint";
import {LogoutButton} from "./auth/LogoutButton";

export const Layout = (props: any)=>{
    return <>
        <div className="flex flex-col h-screen-min overscroll-none">
            <header className="flex-shrink-0 text-black bg-red-500">
                <nav>
                    <ul className="flex flex-row p-5 text-xl">
                        <li>Arbeitszeit</li>
                        <li className="text-lg"><LogoutButton/></li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow">
                {props.children}
            </main>
            <footer className="flex-shrink-0 bg-indigo-500 text-black">
                <nav>
                    <ul className="flex flex-row p-5 text-sm">
                        <li className="mr-2">Copyright</li>
                        <li className="mr-2">Imprint</li>
                        <li>Privacy Policy</li>
                    </ul>
                </nav>
            </footer>
            <Breakpoint />
        </div>
    </>
}
