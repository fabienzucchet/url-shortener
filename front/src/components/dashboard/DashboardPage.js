import React from 'react';

import Page from '../base/Page';
import Widget from '../base/Widget';

import MetricHeader from './MetricHeader';

const DashboardPage = () => {

    return (
        <Page title="URL Dashboard" >
            <MetricHeader />
            <div className="dashboard-body">
                <Widget title="Actions" className="dashboard-actions-menu" bodyClassName="column-widget">
                    Blabla <br />Blabla <br />Blabla <br />Blabla <br />Blabla <br />
                </Widget>
                <Widget title="Your statistics" className="overall-histogram">
                    Ici un histogramme bientôt
                </Widget>
            </div>
        </Page>
    );
}

export default DashboardPage;