import { Box, Typography, Divider, List, ListItem, ListItemButton, Icon } from "@mui/material";
// import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';

const drawerWidth = 240;
const navItems = ['Home', 'Dashboard', 'Contact'];

export default function NavigationBar(props) {

    const { window } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                My page
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>

                        {/* <ListItemButton href={item === 'Home' ? '/' : item} sx={{ textAlign: 'center' }}> */}
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            {/* <ListItemText primary={item} /> */}
                            <Link to={item === 'Home' ? '/' : item}>
                                <Button key={item} sx={{ color: 'black' }}>
                                    {item}
                                </Button>
                            </Link>
                        </ListItemButton>

                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('key');
        navigate("/")
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" style={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <IconButton><Icon sx={{ color: 'white' }}>apple</Icon></IconButton>My Page
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Link to={'/home'}>
                            <Button key={0} sx={{ color: '#fff' }}>
                                <IconButton><Icon sx={{ color: 'white' }}>home</Icon></IconButton>
                                Home
                            </Button>
                        </Link>
                        <Link to={'/dashboard'}>
                            <Button key={1} sx={{ color: '#fff' }}>
                                <IconButton><Icon sx={{ color: 'white' }}>dashboard</Icon></IconButton>
                                Dashboard
                            </Button>
                        </Link>
                        <Link to={'/pagination'}>
                            <Button key={3} sx={{ color: '#fff' }}>
                                <IconButton><Icon sx={{ color: 'white' }}>dashboard</Icon></IconButton>
                                Pagination
                            </Button>
                        </Link>
                        <Link to={'/contact'}>
                            <Button key={2} sx={{ color: '#fff' }}>
                                <IconButton><Icon sx={{ color: 'white' }}>contacts</Icon></IconButton>
                                Contact
                            </Button>
                        </Link>
                        <Link to={'/'}>
                            <Button key={2} sx={{ color: '#fff' }} onClick={handleLogout}>
                                <IconButton><Icon sx={{ color: 'white' }}>logout</Icon></IconButton>
                                Logout
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    )
}