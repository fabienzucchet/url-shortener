import React from 'react';

import Page from '../base/Page';
import Widget from '../base/Widget';

import MetricHeader from './MetricHeader';
import OverallChart from './OverallChart';

const DashboardPage = () => {

    return (
        <Page title="URL Dashboard" >
            <MetricHeader />
            <div className="dashboard-body">
                <Widget title="Actions" className="dashboard-actions-menu" bodyClassName="column-widget">
                    <a className="dashboard-action" href="/" onClick={() => { console.log("Click") }}>Back to Home page</a>
                    <a className="dashboard-action" href="/url/list" onClick={() => { console.log("Click") }}>See all your URL</a>
                    <a className="dashboard-action" href="/url/create" onClick={() => { console.log("Click") }}>Create a new URL</a>
                    <a className="dashboard-action" href="/url/edit" onClick={() => { console.log("Click") }}>Edit an URL</a>
                </Widget>
                <Widget title="Overall statistics" className="overall-chart-container">
                    <OverallChart />
                </Widget>
            </div>
        </Page>
    );
}

export default DashboardPage;