import { createTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth: number;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth?: number;
  }
}

const defaultTheme = createTheme();

export default createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #root': {
          height: '100%',
          backgroundColor: '#1C1E2E',
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#1C1E2E',
        color: '#FFFFFF',
      },
    },
    MuiButton: {
      root: {
        borderRadius: '4px',
        textTransform: 'none',
        // color: 'rgb(40, 42, 43)',
        fontSize: '0.9rem',
        transition: defaultTheme.transitions.create(['background-color', 'box-shadow', 'border', 'color'], {
          duration: defaultTheme.transitions.duration.short,
        }),
      },
      text: {
        padding: '6px 14px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        MuiDisabled: {
          backgroundColor: '#fff',
        },
      },
      containedPrimary: {
        backgroundColor: '#18A0FB',
      },
      outlinedPrimary: {
        border: '2px solid #027AC5',
        '&:hover': {
          border: '2px solid rgb(1, 85, 137)',
        },
      },
      outlinedSecondary: {
        border: '2px solid #FF2323',
      },
      containedSecondary: {
        backgroundColor: '#FF2323',
      },
      startIcon: {
        marginRight: '6px',
      },
      label: {
        color: '#FFFFFF',
      },
    },
    MuiTypography: {
      body1: {
        // color: 'rgb(40, 42, 43)',
        color: 'white',
        fontSize: '0.9rem',
      },
      colorTextSecondary: {
        color: 'white',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '0.9rem',
        color: 'white',
      },
    },
    MuiSelect: {
      root: {
        padding: '0.85em',
      },
    },
    MuiDialogActions: {
      root: {
        padding: '16px',
      },
    },
    MuiTextField: {
      root: {
        // color: 'rgb(40, 42, 43)',
        color: 'white',
      },
    },
    MuiInputLabel: {
      root: {
        // color: 'rgb(40, 42, 43)',
        color: 'white',
        fontSize: '1.1rem',
        marginBottom: '0.2em',
        fontWeight: 500,
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        // borderColor: 'rgb(136, 140, 142)',
        borderWidth: '2px',
        borderColor: '#9295A7',
      },
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
  },
  palette: {
    primary: {
      main: '#1C1E2E',
    },
    secondary: {
      main: '#232736',
    },
  },
  brand: '#18A0FB',
  footerHeight: 72,
  mobileFooterHeight: 56,
  sidebarWidth: 300,
  sidebarMobileHeight: 90,
  sidebarMobilePadding: 8,
  participantBorderWidth: 2,
  mobileTopBarHeight: 52,
  rightDrawerWidth: 320,
});
