import React from 'react';
import * as d3 from 'd3';
import raster from 'landlab_raster_grid_example.json';

const Grid = () => {
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const side = 100;
  const height = (side - margin.top - margin.bottom);
  const width = (side - margin.left - margin.right);
  console.log(raster);
  const circles = raster.nodes.map(d => (<circle key={d.id} cx={d.x} cy={d.y} r={2} fill="teal" />));
  const nodes = circles.map(c => c);
  console.log(nodes);

  return (
    <svg viewBox={`0 0 ${side} ${side}`} height={side}>
      <g transform={`translate(${margin.left} ${margin.right})`} >
        <rect x={0} y={0} width={width} height={height} stroke='black' fill='none' />
        {nodes}
      </g>
    </svg>
  );
};

export default Grid;
