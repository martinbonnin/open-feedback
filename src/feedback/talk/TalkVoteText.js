import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import TalkVoteTextResult from './TalkVoteTextResult'
import { Trans } from 'react-i18next'

const styles = theme => ({
    itemContainer: {
        margin: -1,
    },
    item: {
        overflow: 'hidden',
        padding: theme.spacing(2),
        textAlign: 'center',
        fontSize: '17px',
        borderRadius: '0',
        color: theme.palette.text.secondary,
        boxShadow: 'inset 0 0 0 1px ' + theme.palette.grey[300],
        height: '95px',
        boxSizing: 'border-box',
        '&:hover': {
            backgroundColor: '#f6f6f6',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'all 200ms ease-out',
    },
    selectedItem: {
        boxShadow: 'inset 0 0 0 5px ' + theme.palette.grey[300],
    },
    voteTitle: {
        color: theme.palette.grey[800],
        zIndex: 2,
    },
    voteResult: {
        position: 'absolute',
        bottom: '5px',
        fontSize: '14px',
        transition: 'all 200ms ease-in-out',
        zIndex: 2,
    },
    backgroundCanvas: {
        width: '100%',
    },
    textArea: {
        width: '100%',
        height: '100%',
    },
    leftIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    saveButton: {
        backgroundColor: '#6a96ff',
    },
})

class TalkVoteText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            dataLoaded: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            (this.props.currentUserVote && !prevProps.currentUserVote) ||
            (this.props.currentUserVote &&
                this.state.comment !== this.props.currentUserVote.text &&
                !this.state.dataLoaded)
        ) {
            this.setState({
                ...this.state,
                dataLoaded: true,
                comment: this.props.currentUserVote.text,
            })
        }
    }

    onTextChange = event => {
        this.setState({
            comment: event.target.value,
        })
    }

    onVoteDelete = event => {
        if (this.props.currentUserVote) {
            this.props.onVoteChange(this.props.voteItem, null)
        }
        this.setState({
            comment: '',
        })
    }

    render() {
        const { classes, voteItem, voteResult } = this.props

        const saveUpdateKey = this.props.currentUserVote
            ? 'comment.update'
            : 'comment.save'

        return (
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.itemContainer}>
                <Paper elevation={1} className={classes.item}>
                    <TextField
                        multiline
                        fullWidth
                        margin="none"
                        rows="3"
                        rowsMax="6"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        className={classes.textArea}
                        placeholder={voteItem.name}
                        onChange={this.onTextChange}
                        value={this.state.comment}
                    />
                </Paper>

                {this.state.comment && (
                    <div className={classes.buttonContainer}>
                        <Button onClick={() => this.onVoteDelete()}>
                            <DeleteIcon className={classes.leftIcon} />
                            <Trans i18nKey="comment.delete">
                                Delete comment
                            </Trans>
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.saveButton}
                            onClick={() =>
                                this.props.onVoteChange(
                                    voteItem,
                                    this.state.comment
                                )
                            }>
                            <SaveIcon className={classes.leftIcon} />
                            <Trans i18nKey={saveUpdateKey} />
                        </Button>
                    </div>
                )}

                {voteResult && <TalkVoteTextResult result={voteResult} />}
            </Grid>
        )
    }
}

TalkVoteText.propTypes = {
    classes: PropTypes.object.isRequired,
    voteItem: PropTypes.object.isRequired,
    chipColors: PropTypes.array,
}

export default withStyles(styles)(TalkVoteText)
