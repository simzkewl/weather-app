import  './Header.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import md5 from 'md5-hash';


const Header = () => {
    const [state, setState] = useState({user: "", pass: "", status: "", msg: "", className: ""});
    var status = localStorage.getItem("status");
    if (status === 'Logged in') {
        if (state.className !== "displayNone"){
            setState({...state, className: "displayNone", msg: "Logged in"})
        }
    }else if (status === null){
        localStorage.setItem("status", "Login");
        setState({...state, status: "Login"})
    }
    
    const app_url = 'http://3.15.234.136';
    
    let signup_login = () => {
        if (state.status === 'Signup') { // signup
            fetch(`${app_url}/signup?user=${state.user}&hash=${md5(state.pass)}`)
            .then(response=> {
                if (response.status === 200) {
                    localStorage.setItem("status", "Login");
                    setState({...state, status: "Login", msg: "Signed Up Successfully, Login Now"})
                }
            })
        }else { // login
            fetch(`${app_url}/login?user=${state.user}&hash=${md5(state.pass)}`)
            .then(response=> {
                console.log(response);
                console.log(response.status);
                if (response.status === 200) {
                    localStorage.setItem("status", "Logged in");
                    setState({...state, status: "Logged In", msg: "Logged in", className: "displayNone"})
                }else {
                    localStorage.setItem("status", "Signup");
                    setState({...state, status: "Signup", msg: "Signup first"})
                }
            })
        }
    }



      
    return (
        <div className="AppBar">
            <AppBar position="static">
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <div>
                            <h2><a className="logo" href="/">Weather App</a></h2>
                        </div>
                    </Box>
                    <div id="btn_grp" className={state && state.className}>
                        <TextField label="User Name" value={state.user} onChange={(e) => setState({...state, user: e.target.value})}></TextField>
                        <TextField label="Password" value={state.pass} onChange={(e) => setState({...state, pass: e.target.value})}></TextField>
                        <Button color="inherit" onClick={signup_login}>{state && state.status}</Button>
                    </div>
                    <p id="popup">{state && state.msg}</p>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;