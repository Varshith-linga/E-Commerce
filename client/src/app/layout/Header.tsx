import { AppBar, Switch, Toolbar, Typography } from "../../../node_modules/@mui/material/index";
interface Props{
    darkMode:boolean;
    handleThemeChange:()=>void;
}
export default function Header({darkMode,handleThemeChange}:Props){
    return(
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    RE-STORE
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
            </Toolbar>
        </AppBar>
    )
}