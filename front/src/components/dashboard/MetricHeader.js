import React from 'react';

import MetricBox from '../base/MetricBox';
import Widget from '../base/Widget';

const MetricHeader = () => {

    const metrics = [
        {
            title: "URLs created",
            figure: 6,
            legend: "Since always",
        },
        {
            title: "URLs active",
            figure: 4,
            legend: "Since always",
        },
        {
            title: "Clicks received",
            figure: 243,
            legend: "On all your URLs",
        },
        {
            title: "Clicks received",
            figure: 14,
            legend: "On your last URL",
        },
    ]

    return (
        <Widget bodyClassName="row-widget dashboard-metric-header">
            {metrics.map(({ title, figure, legend }) => (
                <MetricBox
                    title={title}
                    figure={figure}
                    legend={legend} />
                ))}
        </Widget>
    );
}

export default MetricHeader;