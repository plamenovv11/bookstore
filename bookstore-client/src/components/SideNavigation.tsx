import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import { useLogoutMutation } from '../services/authApi';
import { useSnackbar } from './SnackbarContext';
import { store } from '../redux/store';
import { logout as logoutAction } from '../redux/authSlice';

const drawerWidth = 240;

export default function SideNavigation() {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const { showSnackbar } = useSnackbar();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            store.dispatch(logoutAction());
            navigate('/auth');
            showSnackbar('Logout successful!', 'success');
        } catch (err) {
            showSnackbar(`Failed to logout! ${JSON.stringify(err)}`, 'error');
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Box sx={{ flexGrow: 1 }}>
                    <List>
                        <ListItem key="available-books" disablePadding>
                            <ListItemButton component={Link} to="/available-books">
                                <ListItemIcon>
                                    <LibraryBooksIcon />
                                </ListItemIcon>
                                <ListItemText primary="Available Books" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key="cart" disablePadding>
                            <ListItemButton component={Link} to="/cart">
                                <ListItemIcon>
                                    <ShoppingCartIcon />
                                </ListItemIcon>
                                <ListItemText primary="Your Cart" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem key="stores" disablePadding>
                            <ListItemButton component={Link} to="/stores">
                                <ListItemIcon>
                                    <StoreIcon />
                                </ListItemIcon>
                                <ListItemText primary="Stores" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{ padding: 2 }}>
                    <ListItem key="logout" disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <DoorBackIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Drawer>
        </Box>
    );
}
