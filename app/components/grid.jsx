import React from 'react';
import * as d3 from 'd3';
import raster from '../landlab_raster_grid_example.json';

const Grid = () => {
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const row = 3;
  const col = 4;
  const height = (row + 1) * 10;
  const width = (col + 1) * 10;
  const circles = raster.nodes.map(d => (<circle key={d.id} cx={d.x} cy={d.y} r={0.2} fill="teal" />));
  const nodes = circles.map(c => c);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="60vw" >
      <rect x={0} y={0} width={width} height={height} stroke="black" fill="none" strokeWidth={0.2} />
      <g transform={`translate(${margin.top} ${margin.left})`} >
        {nodes}
      </g>
    </svg>
  );
};

export default Grid;
