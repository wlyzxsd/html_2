import React from 'react';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  padding: '8px 12px',
}));

function Navbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar position='static' sx={{ boxShadow: 0, bgcolor: '#5bc0de', mt: 0 }}>
      <Container maxWidth='xl'>
        <StyledToolbar>
          <Typography variant='h6' sx={{ color: 'black', fontWeight: 'bold' }}>
            Легенды автопрома
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button variant='contained' color='info'>Главная</Button>
            <Button variant='text' color='inherit'>Land Cruiser 200</Button>
            <Button variant='text' color='inherit'>Список машин</Button>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <TextField
              size='small'
              placeholder='Найти'
              variant='outlined'
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Button variant='outlined' color='success'>Найти</Button>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor='top' open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuList>
                  <MenuItem
                    sx={{
                      backgroundColor: '#5bc0de',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#5bc0de',
                      },
                    }}
                  >
                    Главная
                  </MenuItem>
                  <MenuItem
                    sx={{
                      backgroundColor: 'transparent',
                      color: 'inherit',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                  >
                    Land Cruiser 200
                  </MenuItem>

                  <MenuItem
                    sx={{
                      backgroundColor: 'transparent',
                      color: 'inherit',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                  >
                    Список машин
                  </MenuItem>
                </MenuList>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;