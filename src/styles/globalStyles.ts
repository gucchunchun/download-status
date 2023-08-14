import { css } from '@emotion/react';
import theme from './theme';

const globalStyles = css`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    body {
        font-family: 'Roboto', sans-serif;
        background-color: rgb(${theme.colors.bg});
        margin: 0;
        padding: 0;
    }
    h1 {
        font-size: 3.052rem;
    }
    h2 {
        font-size: 2.441rem;
    }
    h3 {
        font-size: 1.953rem;
    }
    h4 {
        font-size: 1.563rem;
    }
    h5 {
        font-size: 1.25rem;
    }
    p {
        font-size: 1rem;
    }
    input {
        border: 1px solid rgb(${theme.colors.border});
    }
`

export default globalStyles;