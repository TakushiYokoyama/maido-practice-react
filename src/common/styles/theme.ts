interface ColorLevel {
  bright: string;
  middle: string;
  dark: string;
}
interface ShadowLevel {
  none: string;
  bright: string;
  middle: string;
  dark: string;
}
interface WidthLevel {
  thick: number;
  middle: number;
  thin: number;
}
export interface Theme {
  color: {
    white: ColorLevel;
    gray: ColorLevel;
  };
  backgroundColor: {
    gray: ColorLevel;
  };
  borderColor: {
    gray: ColorLevel;
  };
  fontWeight: {
    bold: string;
  };
  boxShadow: ShadowLevel;
  borderWidth: WidthLevel;
}
export const createTheme = () => {
  return {
    color: {
      white: {
        bright: '#fff',
      },
      gray: {
        bright: '#888',
        middle: '#555',
        dark: '#333',
      },
    },
    backgroundColor: {
      gray: {
        bright: '#888',
        middle: '#555',
        dark: '#333',
      },
    },
    borderColor: {
      gray: {
        middle: '#555',
      },
    },
    borderWidth: {
      thick: 4,
    },
    boxShadow: {
      middle: '1px 1px 2px #888',
      none: 'none',
    },
    fontWeight: {
      bold: 'bold',
    },
  } as Theme;
};
