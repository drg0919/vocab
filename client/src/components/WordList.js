import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Paper,Fab, Input, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import {addWord, closeInputModal, showInputModal, modalLoading, showWord} from '../actions';
import WordCard from './WordCard';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: '300px',
      backgroundColor: theme.palette.background.default,
    },
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        right: '2rem',
        bottom: '2rem'
    },
    empty: {
        textAlign: 'center',
        marginTop: '1rem'
    }
}));

const WordList = (props) => {
    const [w,setW] = useState(null);
    const handleChange = (eve) => {
        setW(eve.target.value);
    }
    const handleSubmit = () => {
        props.modalLoading();
        props.addWord(w);
        setW(null);
    }
    const styles = useStyles();
    let words = props.words;
    let r = new RegExp(`.*${props.searchTerm}.*`);
    words = words.filter(el => r.test(el.word));
    return (
        <>
            {(words.length!==0)&&<Paper elevation={3}>
                <List className={styles.root}>
                    <ListItem key="xyz">
                        <ListItemText 
                            primary={
                                <Typography variant="h5">Words list</Typography>
                            }
                            />
                    </ListItem>
                    <Divider />
                    {words&&words.map((el,ind) => {
                        return (<div key={el._id}>
                        <ListItem button onClick={() => props.showWord(el)}>
                            <ListItemText 
                                primary={<Typography variant="h6">{el.word}</Typography>}
                                secondary={
                                    el.definitions.map((ele,i) => <div key={`${el._id}-${i}`}>({ele.category}) {ele.meaning}</div>)
                                }
                            />
                        </ListItem>
                    {ind!==(words.length-1)&&<Divider />}
                    </div>);
                    })}
                </List>
            </Paper>}
            {(!words||words.length===0)&&<Typography variant="h5" className={styles.empty}>
                Oops! Nothing here
            </Typography>}
            <Fab color="primary" onClick={props.showInputModal} className={styles.fabButton}>
                <AddIcon />
            </Fab>
            <Dialog open={props.showModal}>
                {props.inputForm&&<>
                <DialogTitle id="form-dialog-title">
                    Add to dictionary
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New word
                    </DialogContentText>
                    <Input value={w} onChange={handleChange} autoFocus autoComplete="off" type="text" margin="dense" fullWidth/>
                </DialogContent>
                <DialogActions>
                    {!props.modalLoad&&<Button onClick={handleSubmit} color="primary">Add</Button>}
                    {!props.modalLoad&&<Button onClick={props.closeInputModal} color="primary">Cancel</Button>}
                    {props.modalLoad&&<CircularProgress color="primary" />}
                </DialogActions>
                </>}
                {!props.inputForm&&props.modalMessage&&<>
                    <DialogContent>
                        <DialogContentText>
                            {props.modalMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    {!props.modalLoad&&<Button onClick={props.closeInputModal} color="primary">Close</Button>}
                    </DialogActions>
                </>}
            </Dialog>
            <WordCard />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        words: state.state.words,
        searchTerm: state.state.searchTerm,
        showModal: state.state.showModal,
        modalLoad: state.state.modalLoad,
        inputForm: state.state.inputForm,
        modalMessage: state.state.modalMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeInputModal: () => dispatch(closeInputModal()),
        showInputModal: () => dispatch(showInputModal()),
        addWord: (data) => dispatch(addWord(data)),
        modalLoading: () => dispatch(modalLoading()),
        showWord: (data) => dispatch(showWord(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WordList);