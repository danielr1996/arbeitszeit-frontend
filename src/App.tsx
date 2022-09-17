import {FunctionComponent} from 'react';
import {Overview} from "./components/Overview";
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout";
import {Authenticated} from "./components/auth/Authenticated";
import {Settings} from "./components/Settings";
import {createTheme, ThemeProvider} from "@mui/material";
import {purple} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: purple
    },
    components: {
      MuiButton: {
          defaultProps: {
              variant: "outlined"
          }
      }
    }
})

export const App: FunctionComponent = () => {
    return <>
        <ThemeProvider theme={theme}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Authenticated><Overview/></Authenticated>}/>
                    <Route path="/settings" element={<Authenticated><Settings/></Authenticated>}/>
                </Routes>
            </Layout>
        </ThemeProvider>
    </>
}
