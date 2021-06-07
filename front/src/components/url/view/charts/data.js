import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GetData = (id: Number, since: Number, step: Number) => {
  console.log({ since: since, step: step })

  axios.get(`${process.env.REACT_APP_BACKEND_URL}/url/stats/${id}`, {
    params: {
      start: since,
      step: step,
    }
  }).then((response) => { console.log(response) });


  return [
    {
      "id": "japan",
      "color": "hsl(74, 70%, 50%)",
      "data": [
        {
          "x": "2021-06-05 18:25:00",
          "y": 260
        },
        {
          "x": "2021-06-05 18:30:00",
          "y": 138
        },
        {
          "x": "2021-06-05 18:35:00",
          "y": 80
        },
        {
          "x": "2021-06-05 18:40:00",
          "y": 94
        },
        {
          "x": "2021-06-05 18:45:00",
          "y": 165
        },
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
          "y": 182
        },
        {
          "x": "2021-06-05 19:05:00",
          "y": 198
        },
        {
          "x": "horse",
          "y": 180
        },
        {
          "x": "skateboard",
          "y": 274
        },
        {
          "x": "others",
          "y": 233
        }
      ]
    },
  ]
};

export default GetData;