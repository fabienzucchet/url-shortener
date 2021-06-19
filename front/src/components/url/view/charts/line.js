import React from 'react'
import { ResponsiveLine } from '@nivo/line'

import './chart.css'

const Chart = ({ data }) => {
  return (
    <div className="chart">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 30, bottom: 75, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: '0', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -30,
          legend: '',
          legendOffset: 500,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  )
}

export default Chart