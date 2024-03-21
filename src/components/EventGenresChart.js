import { getWhitelistUrls } from 'atatus-spa';
import React from 'react';
import { useState, useEffect } from 'react';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  // Colors array
  const colors = ['#FFC0CB', '#FFDAB9', '#98FB98', '#4169E1', '#708090'];

  // Use the useEffect hook to update the data state when the events prop changes
  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return data;
  };

  // Creates and returns a customized label
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text> //add ${genres[index]} if you want the genres name labels with percentage
    ) : null;
  };

  return (
    <ResponsiveContainer width='99%' height={400}>
      <h3 className='chart-title'>Number of Events by Genre</h3>
      <PieChart>
        <Pie
          dataKey='value'
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign='bottom' height={50} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
