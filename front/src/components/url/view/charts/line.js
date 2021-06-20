import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'

import './chart.css'

const Chart = ({ data }) => {
  if (data === undefined) {
    return (<div></div>)
  }

  return (
    <div className="chart" >
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 30, bottom: 75, left: 60 }}
        xScale={{ type: 'time', format: "%Y-%m-%d %H:%M:%S", precision: "second", }}
        yScale={{ type: 'linear', min: '0', max: 'auto', stacked: true, reverse: false }}
        xFormat="time:%Y-%m-%d %H:%M:%S"
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
          legendPosition: 'middle',
          format: "%m-%d %H:%M:%S",
          tickValues: 10,
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
        pointSize={0}
        crosshairType="x"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={(input) => {
          return (
            <div style={{ background: "white", color: "inherit", fontSize: "inherit", borderRadius: "2px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 2px", padding: "5px 9px" }}>
              <div>
                {input.point.data.xFormatted}
              </div>
              <div>
                Clics : {input.point.data.y}
              </div>
            </div>
          )
        }}
      />
    </div >
  )
}

export default Chart