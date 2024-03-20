import { React, useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState('');

  // Depending on what city or number of events the user selects, so `${events}`
  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    });
    return data;
  };

  //99 percent allows for maintaining the full ResponsiveContainer width,
  // without responsiveness-related issues, displaying multiple charts along side each other
  return (
    <ResponsiveContainer width='99%' height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60, // more vertical space for labels
          left: -30, // No labels on the left side of the chart, so reduce the space
        }}
      >
        <CartesianGrid />
        <XAxis
          type='category'
          dataKey='city'
          name='city'
          angle={60} // tilts the angle downwards by 60 degrees
          interval={0} // Allows all labels always render, no matter the size of the screen
          tick={{ dx: 20, dy: 40, fontSize: 14 }} // align the label with vertical tick line, 40px so it
          // doesn't clip with the chart
        />
        <YAxis
          type='number'
          dataKey='count'
          name='number of events'
          allowDecimals={false}
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name='A school' data={data} fill='#8884d8' />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
