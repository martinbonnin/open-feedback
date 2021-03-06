import React from 'react'
import { COLORS } from '../../../constants/colors'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { darken, fade, lighten } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        background: props =>
            props.design === 'text'
                ? 'none'
                : props.customBg
                ? props.customBg
                : COLORS.RED_ORANGE,
        color: props =>
            props.design === 'text' ? theme.primaryText : COLORS.WHITE,
        padding: props => (props.type === 'big' ? '12px 32px' : '6px 8px'),
        '&:hover': {
            background: props =>
                props.design === 'text'
                    ? lighten(fade(COLORS.DARK_RED_ORANGE, 1), 0.8)
                    : props.customBg
                    ? darken(props.customBg, 0.2)
                    : COLORS.DARK_RED_ORANGE,
        },
        '&:disabled': {
            color: COLORS.DARK_RED_ORANGE,
        },
    },
}))

const OFButton = props => {
    const classes = useStyles(props.style)

    return (
        <Button
            {...props}
            classes={{
                root: classes.root,
            }}
        />
    )
}

export default OFButton
