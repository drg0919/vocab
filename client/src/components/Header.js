import React, {useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton, Input, Typography } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { changeSearch, clearSearch } from '../actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    title: {
        color: "#fff",
        flexGrow: 1
    },
    root: {
        flexGrow: 1
    },
    button: {
        color: theme.palette.secondary.main,
        position: "absolute",
        right: 0
    },
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    searchBar: {
        width: '100%',
        minWidth: '250px',
    },
    searchBarInput: {
        color: theme.palette.secondary.main
    }
}));

const Header = (props) => {
    const styles = useStyles();
    const [search, setSearch] = useState(false);
    const [term,setTerm] = useState('');
    const handleChange = (eve) => {
        const v = eve.target.value?eve.target.value.toLowerCase():null;
        setTerm(eve.target.value);
        props.changeSearch(v);
    }
    const disableSearch = () => {
        setTerm('');
        setSearch(false);
        props.clearSearch();
    }
    return ( 
    <div className={styles.root}>
        <AppBar position="fixed" color="primary">
            <Toolbar>
            {!search&&<>
                <IconButton edge="start" disableRipple>
                    <Typography variant="h6" className={styles.title}>
                        Vocab
                    </Typography>
                </IconButton>
                <IconButton onClick={() => setSearch(true)} className={styles.button}>
                    <Search />
                </IconButton>
            </>}
            {search&&<>
                <Input placeholder="Search..." autoFocus autoComplete="off" classes={{
                    input: styles.searchBarInput
                }} className={styles.searchBar} value={term} onChange={handleChange} disableUnderline color="secondary" />
                <IconButton onClick={disableSearch} className={styles.button}>
                    <ClearIcon />
                </IconButton>
            </>}
            </Toolbar>
        </AppBar>
        <div className={styles.toolbarMargin} />
    </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSearch: (data) => dispatch(changeSearch(data)),
        clearSearch: () => dispatch(clearSearch())
    }
}

export default connect(null,mapDispatchToProps)(Header);