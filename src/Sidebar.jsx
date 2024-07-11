import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Home from '@mui/icons-material/Home'
import Logout from '@mui/icons-material/Logout'
import LocationCity from '@mui/icons-material/LocationCity'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from './services/appStore'
import {getAuth,signOut} from 'firebase/auth'
import {app} from './services/firebase'

const drawerWidth = 240;
const auth=getAuth(app)

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    background:'#B83BB0',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),backgroundColor:'#B83BB0'
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const navigate=useNavigate()
  const open=useAppStore((state)=>state.dopen)

  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      navigate('/login')
    })
    .catch(()=>{
      console.error('Error signing out:',error)
    })
  }

  return (
    <Box sx={{ display: 'flex'  }}>
      <CssBaseline />
      <Box height={30 }/>
     
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          
            <ListItem disablePadding sx={{ display: 'block' ,border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 180, 100, 175 ,1)' }} onClick={()=>{navigate('/')}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                }}
              >
                <Home />
              </ListItemIcon>
              <ListItemText primary='Home' sx={{ opacity: open ? 1 : 0 ,}} />
            </ListItemButton>
          </ListItem>
            <ListItem disablePadding sx={{ display: 'block',border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)' }} onClick={()=>{navigate('/searchcity')}}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LocationCity />
              </ListItemIcon>
              <ListItemText primary='Search City' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
            <ListItem disablePadding sx={{ display: 'block',border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)' }} onClick={handleSignOut}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                border: '1px solid #B83BB0', boxShadow: '0px 4px 10px rgba( 184, 59, 176,1)'
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
