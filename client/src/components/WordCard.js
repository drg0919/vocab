import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { ListItemIcon } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {connect} from 'react-redux';
import { closeWord } from '../actions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  nested: {
      paddingLeft: '2rem'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WordCard = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog fullScreen open={props.showWord} onClose={() => props.closeWord()} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {props.currentWord.word}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={props.closeWord}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
            {props.currentWord.etymologies&&<ListItem>
                {props.currentWord.etymologies&&<ListItemText secondary={<div>Origin: {props.currentWord.etymologies}</div>} />}
            </ListItem>}
            <Divider />
            {props.currentWord.definitions&&props.currentWord.definitions.map(el => {
                return <div key={el._id}>
                    <ListItem>
                        <ListItemText primary={
                            <Typography
                                variant="body2"
                                className={classes.inline}
                                color="textSecondary"
                            >
                                {el.category}
                            </Typography>
                        } 
                        secondary={
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {el.meaning}
                            </Typography>
                        } />
                    </ListItem>
                    {el.examples&&<List component="div" disablePadding>
                        {el.examples&&el.examples.map(ele => <ListItem key={ele._id} className={classes.nested}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {ele}
                            </Typography>
                            } />
                        </ListItem>)}
                    </List>}
                    <Divider />
                </div>
            })}
        </List>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        showWord: state.state.showWord,
        currentWord: state.state.currentWord
    }
}

const mapDispatchTopProps = (dispatch) => {
    return {
        closeWord: (data) => dispatch(closeWord(data))
    }
}

export default connect(mapStateToProps,mapDispatchTopProps)(WordCard);