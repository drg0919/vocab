import {createMuiTheme} from '@material-ui/core/styles';

export const cranePurple = "#5D1049";

export default createMuiTheme({
    palette: {
        common: {
            cranePurple
        },
        primary: {
            main: cranePurple
        },
        secondary: {
            main: "#fff"
        }
    },
    typography: {
        fontFamily: "'Kumbh Sans', sans-serif"
    }
});