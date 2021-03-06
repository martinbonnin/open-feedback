import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { cancelInvite, getPendingInvites } from './usersActions'
import { getPendingInvitesSelector } from './usersSelectors'
import UserInviteItem from './UserInviteItem'
import TranslatedTypography from '../../../baseComponents/TranslatedTypography'

const UserInviteList = () => {
    const dispatch = useDispatch()
    const pendingInvites = useSelector(getPendingInvitesSelector)

    useEffect(() => {
        dispatch(getPendingInvites())
    }, [dispatch])

    if (pendingInvites.length === 0) {
        return ''
    }

    return (
        <Box>
            <TranslatedTypography
                variant="h6"
                style={{ marginTop: 20, marginLeft: 32, marginBottom: 10 }}
                i18nKey="settingsUser.invites">
                PENDING INVITES
            </TranslatedTypography>
            {pendingInvites.map(invite => (
                <UserInviteItem
                    key={invite.id}
                    invite={invite}
                    cancelInvite={inviteId => dispatch(cancelInvite(inviteId))}
                />
            ))}
        </Box>
    )
}

export default UserInviteList
