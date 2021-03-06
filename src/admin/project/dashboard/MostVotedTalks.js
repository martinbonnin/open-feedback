import React from 'react'
import { useSelector } from 'react-redux'
import LoaderMatchParent from '../../../baseComponents/customComponent/LoaderMatchParent'
import { getMostVotedTalkSelector } from './dashboardSelectors'
import ThumbsUpIcon from '@material-ui/icons/ThumbUpSharp'
import DashboardCard from './utils/DashboardCard'
import Grid from '@material-ui/core/Grid'
import COLORS from '../../../constants/colors'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { getSelectedProjectIdSelector } from '../core/projectSelectors'
import NoData from './utils/NoData'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
    title: {
        padding: 0,
    },
    count: {
        color: COLORS.RED_ORANGE,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

const MostVotedTalks = ({ dinoStartDelay }) => {
    const classes = useStyles()
    const mostVotedTalks = useSelector(getMostVotedTalkSelector)
    const projectId = useSelector(getSelectedProjectIdSelector)
    const { t } = useTranslation()

    if (!mostVotedTalks) {
        return <LoaderMatchParent />
    }

    return (
        <DashboardCard
            title={t('dashboard.mostVoted')}
            titleIcon={<ThumbsUpIcon />}>
            <NoData datas={mostVotedTalks} dinoStartDelay={dinoStartDelay}>
                <Grid container spacing={2}>
                    {mostVotedTalks.map(row => (
                        <React.Fragment key={row.talkId}>
                            <Grid
                                item
                                xs={10}
                                className={classes.title}
                                component="a"
                                target="_blank"
                                style={{ color: '#000' }}
                                href={`/${projectId}/${row.date}/${row.talkId}`}>
                                {row.title}
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                component="a"
                                target="_blank"
                                align="right"
                                href={`/${projectId}/${row.date}/${row.talkId}`}
                                className={classes.count}>
                                {row.voteCount}
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </NoData>
        </DashboardCard>
    )
}

export default MostVotedTalks
