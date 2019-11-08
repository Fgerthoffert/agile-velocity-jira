import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../../layout';
import Details from './Details';
import Completion from './Completion';
import Forecast from './Forecast';
import SectionTabs from './sectiontabs';
import LoadingBar from './LoadingBar';
import DataStatus from './DataStatus';

const mapDispatch = (dispatch: any) => ({
  setPageTitle: dispatch.global.setPageTitle,
  initView: dispatch.roadmap.initView,
  setShowMenu: dispatch.global.setShowMenu,
});

type connectedProps = ReturnType<typeof mapDispatch>;

const Roadmap: FC<connectedProps> = ({
  setPageTitle,
  initView,
  setShowMenu,
}) => {
  setPageTitle('Initiatives');
  useEffect(() => {
    setShowMenu(false);
    initView();
  });
  return (
    <Layout>
      <LoadingBar />
      <SectionTabs />
      <DataStatus />
      <br />
      <Completion />
      <Forecast />
      <Details />
    </Layout>
  );
};

export default connect(
  null,
  mapDispatch,
)(Roadmap);
