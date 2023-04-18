import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import TranscribeIcon from '@mui/icons-material/Transcribe';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useTheme } from '@/providers/ThemeProvider';

interface PageLink {
  name: string;
  link: string;
}

const pages: Array<PageLink> = [
  { name: 'Portfolio', link: 'portfolio' },
  { name: 'Contact', link: 'contact' },
];

export default function Navbar() {
  const { colorMode } = useTheme();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [actionLinks, setActionLinks] = useState<Array<PageLink>>([]);
  const [currentPath, setCurrentPath] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, []);

  const renderLink = (page: PageLink, overrideLink?: boolean) => {
    /* if (!overrideLink && (currentPath === '/' || currentPath === '')) {
      return (
        <MenuItem
          key={page.name}
          onClick={() => {
            handleCloseUserMenu();
            scrollToSection(page.link);
          }}
          sx={{ my: 2, display: 'block', color: 'button.text.primary' }}
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      );
    } else { */
    return (
      <Box
        onClick={() => {
          router.push(page.link);
        }}
        key={page.name}
      >
        <MenuItem
          key={page.name}
          onClick={handleCloseUserMenu}
          sx={{
            my: 2,
            display: 'block',
            color: 'button.text.primary',
          }}
        >
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem>
      </Box>
    );
    //}
  };

  const renderLogo = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <Box onClick={() => scrollToSection('top')}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'button.text.primary',
              textDecoration: 'none',
              ':hover': {
                cursor: 'pointer',
              },
            }}
          >
            RYAN MILLER
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box
          onClick={() => {
            router.push('/');
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'button.text.primary',
              textDecoration: 'none',
              ':hover': {
                cursor: 'pointer',
              },
            }}
          >
            RYAN MILLER
          </Typography>
        </Box>
      );
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        padding: '0 !important',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TranscribeIcon
            sx={{ color: 'button.text.primary', display: { xs: 'none', md: 'flex' }, mr: 1 }}
          />
          <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>{renderLogo()}</Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => renderLink(page))}
            </Menu>
          </Box>
          <TranscribeIcon
            sx={{ color: 'button.text.primary', display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Box sx={{ mr: 2, display: { xs: 'flex', md: 'none' }, flexGrow: 1 }}>{renderLogo()}</Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => renderLink(page))}
          </Box>
          <Box sx={{ marginRight: '12px', display: { xs: 'flex', md: 'flex' } }}>
            {actionLinks.map((action) => renderLink(action, true))}
            <IconButton
              aria-label="toggle colour mode"
              onClick={colorMode?.toggleColorMode}
              style={{
                color: 'white',
              }}
            >
              {colorMode?.currentMode === 'light' ? (
                <DarkModeIcon fontSize="medium" />
              ) : (
                <LightModeIcon fontSize="medium" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
