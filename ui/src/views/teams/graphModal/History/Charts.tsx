import React, { FC, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

import { iRootState } from '../../../../store';

// import HistoryCompletionChart from '../../../../components/Charts/ChartJS/HistoryCompletionChart';
// import HistoryForecastChart from '../../../../components/Charts/ChartJS/HistoryForecastChart';
// import HistoryFocusChart from '../../../../components/Charts/ChartJS/HistoryFocusChart';

const mapState = (state: iRootState) => ({
  roadmap: state.initiatives.roadmap,
  initiativeHistory: state.initiatives.initiativeHistory,
  initiativeHistoryKey: state.initiatives.initiativeHistoryKey,
  defaultPoints: state.global.defaultPoints,
});

const mapDispatch = (dispatch: any) => ({
  initHistory: dispatch.initiatives.initHistory,
});

type connectedProps = ReturnType<typeof mapState | any> &
  ReturnType<typeof mapDispatch>;

const Charts: FC<connectedProps> = ({
  initiativeHistoryKey,
  initiativeHistory,
  defaultPoints,
  roadmap,
}) => {
  if (initiativeHistory === false) {
    return null;
  }
  let metric = 'Story Points';
  if (!defaultPoints) {
    metric = 'Issues Count';
  }
  console.log(initiativeHistory);

  const historicalData = initiativeHistory.filter(
    (w: any) => w.history !== null && w.history.forecast !== undefined,
  );

  return (
    <React.Fragment>
      <Grid container spacing={3} direction="column">
        {historicalData.length > 0 && (
          <Grid item xs={12}>
            <Paper>
              <Typography variant="subtitle1">
                Evolution of the initiative complexity ({metric})
              </Typography>
              {/* <HistoryCompletionChart
                dataset={initiativeHistory}
                defaultPoints={defaultPoints}
              /> */}
            </Paper>
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper>
            <Typography variant="subtitle1">
              Evolution of the team focus (%) on the initiative ({metric})
            </Typography>
            {/* <HistoryFocusChart
              dataset={initiativeHistory}
              defaultPoints={defaultPoints}
              jiraHost={roadmap.host}
            /> */}
            <Typography variant="caption" display="block" gutterBottom>
              Note: External contributors can bring team effort to over 100%
            </Typography>
          </Paper>
        </Grid>
        {historicalData.length > 0 && (
          <Grid item xs={12}>
            <Paper>
              <Typography variant="subtitle1">
                Evolution of the naive forecast ({metric})
              </Typography>
              {/* <HistoryForecastChart
                dataset={historicalData}
                defaultPoints={defaultPoints}
              /> */}
            </Paper>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default connect(mapState, mapDispatch)(Charts);
