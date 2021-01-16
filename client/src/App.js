import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ThemeProvider} from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme, { cranePurple } from './components/Theme';
import Header from './components/Header';
import WordList from './components/WordList';
import { connect } from 'react-redux';
import { fetchWords } from './actions';

const App = (props) => {
    useEffect(() => {
        props.fetchWords();
    },[]);
    if(props.state.loading)
        return <div style={{
            position: 'absolute',
            left: '42%',
            top: '32%'
        }}>
        <CircularProgress color="inherit" size="10rem"/>
        </div>
    if(props.state.error)
        return <Dialog
        open={props.state.error}>
            <DialogTitle id="alert-dialog-title">{"An error occurred"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    An error occurred. Kindly try again later
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => window.location.reload()} color={cranePurple}>Reload</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Header />
                <WordList />
            </ThemeProvider>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWords: () => dispatch(fetchWords())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
