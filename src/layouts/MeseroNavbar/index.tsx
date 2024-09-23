import React from 'react';
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'; // Puedes cambiar este ícono si quieres
import LogoutIcon from '@mui/icons-material/ExitToAppRounded';
import MuiDrawer from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import cheesito from '../../assets/img/cheesito.png'

// Ancho del Drawer
const drawerWidth = 80;

// Estilo del Drawer cuando está cerrado (solo íconos)
const closedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
  },
});

// Definir `Drawer` con el tema adecuado
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...closedMixin(theme),
}));

// Aquí actualizamos el tamaño de los íconos y el color
const iconStyle = {
  color: '#fe7f2d', // Color naranja
  fontSize: '32px', // Tamaño más grande
};

export default function MeseroNavbar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" sx={{ display: 'flex', alignItems: 'center' }}> {/* Alineamos el Drawer al centro */}
        {/* Logo al inicio */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '20px',
          }}
        >
          <img src={cheesito} alt="Logo" style={{ width: '40px', height: '40px' }} />
        </Box>

        {/* Lista de íconos con espacio extra y alineación centrada */}
        <List sx={{ width: '100%' }}> {/* Asegurar que la lista ocupe todo el ancho */}
          <ListItem disablePadding sx={{ marginY: 2, justifyContent: 'center' }}> {/* Centrar íconos */}
            <ListItemButton component={NavLink} to="/mesero/home" sx={{ justifyContent: 'center', display: 'flex' }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <HomeIcon style={iconStyle} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          {/* Ícono de mesas (puedes modificar este ícono si necesitas otro) */}
          <ListItem disablePadding sx={{ marginY: 2, justifyContent: 'center' }}>
            <ListItemButton component={NavLink} to="/mesero/ordenes" sx={{ justifyContent: 'center', display: 'flex' }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <TableRestaurantIcon style={iconStyle} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          {/* Otros íconos que quieras agregar para el mesero pueden ir aquí */}
        </List>

        {/* Separador */}
        <Divider />

        {/* Botón de Cerrar Sesión en la parte inferior */}
        <Box sx={{ flexGrow: 1 }} />
        <List sx={{ width: '100%' }}>
          <ListItem disablePadding sx={{ marginY: 2, justifyContent: 'center' }}>
            <ListItemButton component={NavLink} to="/login" sx={{ justifyContent: 'center', display: 'flex' }}>
              <ListItemIcon sx={{ justifyContent: 'center' }}>
                <LogoutIcon style={iconStyle} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

