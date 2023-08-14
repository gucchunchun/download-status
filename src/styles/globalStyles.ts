import { css } from '@emotion/react';
import theme from './theme';

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    body {
        font-family: 'Roboto', sans-serif;
        background-color: rgb(${theme.colors.bg});
        margin: 0;
        padding: 0;
        color: rgb(${theme.colors.textPrimary});
    }
    h1 {
        font-size: 3.052rem;
        font-weight: bold;
    }
    h2 {
        font-size: 2.441rem;
        font-weight: bold;
    }
    h3 {
        font-size: 1.953rem;
        font-weight: bold;
    }
    h4 {
        font-size: 1.563rem;
        font-weight: bold;
    }
    h5 {
        font-size: 1.25rem;
        font-weight: bold;
    }
    p {
        font-size: 1rem;
    }
`

export default globalStyles;