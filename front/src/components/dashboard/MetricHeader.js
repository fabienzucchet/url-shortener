import React from 'react';

import MetricBox from '../base/MetricBox';
import Widget from '../base/Widget';

const MetricHeader = () => {

    const metrics = [
        {
            title: "URL created",
            figure: 6,
            legend: "Since always",
        },
        {
            title: "URL created",
            figure: 6,
            legend: "Since always",
        },
        {
            title: "URL created",
            figure: 6,
            legend: "Since always",
        },
        {
            title: "URL created",
            figure: 6,
            legend: "Since always",
        },
    ]

    return (
        <Widget className="row-widget">
            <div className="dashboard-metric-header">
                {metrics.map(({ title, figure, legend }) => (
                    <MetricBox
                        title={title}
                        figure={figure}
                        legend={legend} />
                    ))}
            </div>
        </Widget>
    );
}

export default MetricHeader;