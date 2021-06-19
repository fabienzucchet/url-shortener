import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns'

const defaultGraph = [
  {
    "id": "default",
    "color": "hsl(0, 0%, 0%)",
    "data": [
      {
        "x": "2021-06-05 18:50:00",
        "y": 191
      },
      {
        "x": "2021-06-05 18:55:00",
        "y": 113
      },
      {
        "x": "2021-06-05 19:00:00",
        "y": 120
      },
      {
        "x": "2021-06-05 19:05:00",
        "y": 198
      },
      {
        "x": "2021-06-05 19:10:00",
        "y": 160
      },
      {
        "x": "2021-06-05 19:15:00",
        "y": 198
      },
    ]
  },
];

async function GetData({ queryRange }) {
  console.log("data.js L39 : ", queryRange);
  if (queryRange === undefined) {
    queryRange = { id: 1, start: Math.floor(Date.now() / 1000) - 60 * 60, stop: Math.floor(Date.now() / 1000) }
  }
  const id = queryRange.id;
  const since = queryRange.start;
  const stop = queryRange.stop;
  const step = Math.floor((stop - since) / 10);

  const newData = [];
  const [data, setData] = useState(defaultGraph);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_HOSTNAME}/api/url/stats/${id}`, {
      params: {
        start: since,
        stop: stop,
        step: step,
      }
    }).then((response) => {
      console.log(response.data)
      if (response.data.stats.length > 0) {
        console.log(response.data.stats[0].records);
        var point;
        var pointDate;
        var date = ""
        var startDate = format(Date.parse(response.data.stats[0].records[0].values._start), 'yyyy/MM/dd');
        var stopDate = format(Date.parse(response.data.stats[0].records[0].values._stop), 'yyyy/MM/dd');
        var shouldShowDate = stopDate !== startDate;
        console.log("should show date : ", shouldShowDate)
        for (let i = response.data.stats[0].records.length - 1; i >= 0; i--) {
          date = ""
          point = response.data.stats[0].records[i].values;
          pointDate = Date.parse(point._time)
          if (shouldShowDate) {
            if (i === 0) {
              date += format(pointDate, 'yyyy/MM/dd')
            } else {
              var previousPointDateStr = format(Date.parse(response.data.stats[0].records[i - 1].values._time), 'yyyy/MM/dd');
              var actualPointDateStr = format(pointDate, 'yyyy/MM/dd')
              if (previousPointDateStr !== actualPointDateStr) {
                date += format(pointDate, 'yyyy/MM/dd')
              }
            }
          }
          date += " " + format(pointDate, "kk:mm:ss")
          newData.push(
            {
              "x": date,
              "y": point._value
            }
          );
        }
        setData([
          {
            "id": "test",
            "color": "hsl(74, 70%, 50%)",
            "data": newData
          }
        ]);
        newData.length = 0;
      } else {
        setData(defaultGraph)
      }
    });
  }, [id, since])

  return data
};

export default GetData;