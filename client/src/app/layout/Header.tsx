import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "../../../node_modules/@mui/material/index";
import { Link } from '../../../node_modules/react-router-dom/dist/index';
import { NavLink } from "../../../node_modules/react-router-dom/dist/index";
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    Typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({ darkMode, handleThemeChange }: Props) {
    const {basket} =useAppSelector((state:any)=>state.basket);
    const {user} =useAppSelector((state:any)=>state.account);

    const itemCount=basket?.items.reduce((sum:any,item:any)=>sum+item.quantity,0)
    
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                <Typography variant='h6' sx={navStyles} component={NavLink} to="/">
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem key={path} component={NavLink} to={path} sx={navStyles}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>


                    {user?(
                    <SignedInMenu/>
                    ):(
                        <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem key={path} component={NavLink} to={path} sx={navStyles}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}