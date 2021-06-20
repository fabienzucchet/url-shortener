import React from 'react';
import axios from 'axios';
import { format, set } from 'date-fns'

const DefaultData = [
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
      {
        "x": "2021-06-05 19:20:00",
        "y": 120
      },
      {
        "x": "2021-06-05 19:25:00",
        "y": 167
      },
      {
        "x": "2021-06-05 19:30:00",
        "y": 189
      },
      {
        "x": "2021-06-05 19:35:00",
        "y": 230
      },
      {
        "x": "2021-06-05 19:40:00",
        "y": 260
      }, {
        "x": "2021-06-05 19:45:00",
        "y": 167
      },
      {
        "x": "2021-06-05 19:50:00",
        "y": 189
      },
      {
        "x": "2021-06-05 19:55:00",
        "y": 230
      },
      {
        "x": "2021-06-05 20:00:00",
        "y": 260
      },
      {
        "x": "2021-06-05 20:05:00",
        "y": 260
      },
      {
        "x": "2021-06-05 20:10:00",
        "y": 270
      },
      {
        "x": "2021-06-05 20:15:00",
        "y": 220
      },
      {
        "x": "2021-06-05 20:20:00",
        "y": 290
      },
      {
        "x": "2021-06-05 20:25:00",
        "y": 350
      },
      {
        "x": "2021-06-05 20:30:00",
        "y": 210
      },
      {
        "x": "2021-06-05 20:35:00",
        "y": 400
      },
    ]
  },
];

const GetData = (queryRange, setData) => {
  console.log("data.js L39 : ", queryRange);
  const id = queryRange.id;
  const since = queryRange.start;
  const stop = queryRange.stop;
  const step = Math.floor((stop - since) / 180);

  let data = DefaultData;

  axios.get(`${process.env.REACT_APP_HOSTNAME}/api/url/stats/${id}`, {
    params: {
      start: since,
      stop: stop,
      step: step,
    }
  }).then((response) => {
    console.log("http res : ", response)
    if (response.data.stats.length > 0) {
      let newData = [];
      let point;
      let pointDate;
      let date = ""
      let startDate = format(Date.parse(response.data.stats[0].records[0].values._start), 'yyyy/MM/dd');
      let stopDate = format(Date.parse(response.data.stats[0].records[0].values._stop), 'yyyy/MM/dd');
      let shouldShowDate = stopDate !== startDate;
      for (let i = response.data.stats[0].records.length - 1; i >= 0; i--) {
        point = response.data.stats[0].records[i].values;
        pointDate = Date.parse(point._time)
        date = format(pointDate, "yyyy-MM-dd HH:mm:ss");
        newData.push(
          {
            "x": date,
            "y": point._value
          }
        );
      }
      data = [
        {
          "id": "test",
          "color": "hsl(74, 70%, 50%)",
          "data": newData
        }
      ];
      console.log("output data.js : ", data);
      setData(data);
    } else {
      setData(DefaultData);
    }
  });
};

export { GetData, DefaultData };
