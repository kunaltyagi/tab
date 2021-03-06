import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import TreeIcon from 'mdi-material-ui/PineTree'
import CountdownClock from 'js/components/Campaign/CountdownClockComponent'
import InviteFriend from 'js/components/Settings/Profile/InviteFriendContainer'
import { abbreviateNumber } from 'js/utils/utils'
import Link from 'js/components/General/Link'
import { withTheme } from '@material-ui/core/styles'
import { treePlantingCampaignHomepageURL } from 'js/navigation/navigation'

class TreePlantingCampaign extends React.Component {
  render() {
    const { app, user, campaign, theme } = this.props
    const {
      recruits: { recruitsWithAtLeastOneTab = {} },
    } = user
    const { time, treesPlantedGoal } = campaign
    const hasCampaignEnded = moment().isAfter(time.end)
    const treesPlantedAbbreviated = abbreviateNumber(app.campaign.numNewUsers)
    const treesPlantedGoalAbbreviated = abbreviateNumber(treesPlantedGoal)
    const progress = (100 * app.campaign.numNewUsers) / treesPlantedGoal
    const treesWord = app.campaign.numNewUsers === 1 ? 'tree' : 'trees'

    // Tree icon style
    const treeStyle = {
      height: 60,
      width: 60,
    }
    const plantedTreeStyle = Object.assign({}, treeStyle, {
      color: theme.palette.secondary.main,
    })
    const incompleteTreeStyle = Object.assign({}, treeStyle, {
      color: '#BBB',
    })

    return (
      <div
        style={{
          width: 480,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      >
        {' '}
        <Typography
          variant={'h6'}
          style={{
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          {hasCampaignEnded
            ? 'Thanks for planting trees!'
            : 'Recruit a friend, plant a tree'}
        </Typography>
        <div
          style={{
            margin: '14px 10px 14px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 8,
                }}
              >
                <div>
                  {recruitsWithAtLeastOneTab > 0 ? (
                    <TreeIcon style={plantedTreeStyle} />
                  ) : (
                    <TreeIcon style={incompleteTreeStyle} />
                  )}
                  {recruitsWithAtLeastOneTab > 1 ? (
                    <TreeIcon style={plantedTreeStyle} />
                  ) : (
                    <TreeIcon style={incompleteTreeStyle} />
                  )}
                  {recruitsWithAtLeastOneTab > 2 ? (
                    <TreeIcon style={plantedTreeStyle} />
                  ) : (
                    <TreeIcon style={incompleteTreeStyle} />
                  )}
                </div>
                <Typography variant={'body2'} gutterBottom>
                  {recruitsWithAtLeastOneTab}/3 trees planted
                </Typography>
              </div>
            </div>
            {hasCampaignEnded ? null : (
              <div style={{ margin: 16 }}>
                <InviteFriend
                  user={user}
                  InputProps={{ style: { fontSize: 14 } }}
                  label={'Share this link with a friend'}
                  helperText={"and you'll plant a tree when they join!"}
                  style={{
                    minWidth: 280,
                  }}
                />
              </div>
            )}
            <div style={{ margin: 12 }}>
              {hasCampaignEnded ? (
                <Typography variant={'body2'}>
                  Together, we planted {treesPlantedAbbreviated} trees this
                  holiday season! Great job, and thank you for spreading the
                  word about Tab for a Cause!
                </Typography>
              ) : (
                <Typography variant={'body2'}>
                  Now until January 10,{' '}
                  <Link
                    to={treePlantingCampaignHomepageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: theme.palette.secondary.main }}
                  >
                    we're planting a tree
                  </Link>{' '}
                  for every person who joins Tab for a Cause!
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 8,
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          <div
            data-test-id={'trees-planted-progress-bar'}
            style={{
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {hasCampaignEnded ? null : (
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant={'caption'}>
                  {treesPlantedAbbreviated} {treesWord} planted
                </Typography>
                <Typography variant={'caption'}>
                  Goal: {treesPlantedGoalAbbreviated}
                </Typography>
              </span>
            )}
            <LinearProgress
              color={'primary'}
              variant={'determinate'}
              value={progress}
            />
          </div>
          <Typography variant={'caption'}>
            <CountdownClock
              campaignStartDatetime={time.start}
              campaignEndDatetime={time.end}
            />{' '}
            remaining
          </Typography>
        </div>
      </div>
    )
  }
}

TreePlantingCampaign.propTypes = {
  app: PropTypes.shape({
    campaign: PropTypes.shape({
      numNewUsers: PropTypes.number.isRequired,
    }).isRequired,
  }),
  campaign: PropTypes.shape({
    time: PropTypes.shape({
      start: PropTypes.instanceOf(moment).isRequired,
      end: PropTypes.instanceOf(moment).isRequired,
    }),
    treesPlantedGoal: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    recruits: PropTypes.shape({
      recruitsWithAtLeastOneTab: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme()(TreePlantingCampaign)
