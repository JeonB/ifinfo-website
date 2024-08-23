import { defineStyleConfig, extendTheme } from '@chakra-ui/react'
// import  '@fontsource/inter'

// const fonts = { mono: `'Menlo', monospace` }
const fonts = {
  heading: `'Inter'`,
  body: `'Inter'`,
}

// 화면 크기 구간
const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

// 웹에서 쓰는 모든 색 정의. 전역에서 color = gbs.a 처럼 사용.
const colors = {
  gbs: {
    a: '#711F16',
    ag: 'linear-gradient(5deg,#5E1710, #7B1F15 60%, #922418 )',
    b: '#A31111',
    c: '#DBC1BF',
    d: '#CFCFCF',
    e: '#D3D3D3',
    f: '#EFEEEE',
    g: '#F0F0F0',
    h: '#FAFAFA',
    i: '#F6F6F6',
    j: '#F9FAFC',
    k: '#FFFFFF',
    l: '#E3E3E3',
    m: '#6D6969',
    n: '#D9D9D9',
    footer: '#518bff',
  },
}

const inputTheme = defineStyleConfig({
  baseStyle: {
    // border: 1,
  },
  variants: {
    outline: {
      field: {
        border: '1.5px solid',
        _focus: {
          borderColor: colors.gbs.a,
          boxShadow: 'none',
        },
      },
    },
  },
})

const btnTheme = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'semibold',
    // bgColor: ,
    // textTransform: 'uppercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
  },

  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      // border: '2px solid',
      // borderColor: 'purple.500',
      // color: 'purple.500',
    },
    solid: {
      bg: 'purple.500',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    // size: 'md',
    variant: 'outline',
  },
})

const theme = extendTheme({
  components: {
    Button: btnTheme,
    Input: inputTheme,
  },
  semanticTokens: {
    colors: {
      text: {
        default: 'gray',
        _dark: '#ade3b8',
      },
      btnText: {
        default: 'white',
        _dark: 'white',
      },
      menuText: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
      background: {
        default: 'gray.100',
        _dark: 'gray.900',
      },
    },
    radii: {
      button: '12px',
    },
  },
  fonts,
  breakpoints,
  colors,
})

export default theme
