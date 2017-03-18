import React from 'react';
// import * as d3 from 'd3';
// import raster from '../landlab_raster_grid_example.json';
import classNames from 'classnames';

import grid from '../theme/grid.scss';
import node from '../theme/node.scss';
import cell from '../theme/cell.scss';
import link from '../theme/link.scss';
import patch from '../theme/patch.scss';
// import face from '../theme/face.scss';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      node: false,
      activeNode: null,
      cell: false,
      activeCell: null,
      patch: false,
      activePatch: null,
    };
  }

  render() {
    const { data } = this.props;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const row = 3;
    const col = 4;
    const chartHeight = (row + 1) * 10;
    const chartWidth = (col + 1) * 10;

    const cellWidth = data.faces[0].length;

    // const corner-top-right = data.cells[0].area;

    const getCorners = (x, y, width) => (
      [
        {
          x: x + (width / 2),
          y: y - (width / 2),
        },
        {
          x: x - (width / 2),
          y: y - (width / 2),
        },
        {
          x: x - (width / 2),
          y: y + (width / 2),
        },
        {
          x: x + (width / 2),
          y: y + (width / 2),
        },
      ]
    );

    const getRasterCell = (x, y, width) => {
      const corner = getCorners(x, y, width);
      const d = `M ${corner[0].x} ${corner[0].y} ${corner[1].x} ${corner[1].y} ${corner[2].x} ${corner[2].y} ${corner[3].x} ${corner[3].y} Z`;
      return d;
    };

    // const getHexCell = (x, y, width) => {
    //   const d = `M ${EX} ${EY} ${NX} ${NY} ${WX} ${WY} ${SX} ${SY} Z`;
    //   return d;
    // }

    // const getFace = (x, y, head, tail, cellWidth) => {
    //
    //   const x1 = x + (width / 2);
    //
    //   return {
    //     x1: x + (width / 2),
    //     y1: y - (width / 2),
    //     x2: x - (width / 2),
    //     y2: y - (width / 2),
    //   }
    // };

    const nodeClassName = classNames(
      node.node,
      this.state.node && node.highlight,
    );

    const cellClassName = classNames(
      cell.cell,
      this.state.cell && cell.highlight,
    );

    // const faceClassName = classNames(
    //   face.face,
    //   this.state.face && face.highlight,
    // );

    const nodes = data.nodes.map(d => (
      <g key={`node ${d.id}`}>
        <circle className={nodeClassName} cx={d.x} cy={d.y} r={0.7} title={`node ${d.id}`} onMouseEnter={() => this.setState({ node: true, activeNode: d.id })} onMouseLeave={() => this.setState({ node: false, activeNode: null })} />
        <text className={this.state.activeNode === d.id ? grid.active : grid.title} x={d.x} dy={-2} y={d.y} textAnchor="middle" >{`node ${d.id}`}</text>
      </g>
      ),
    );

    const cells = data.cells.map(d => (
      <g key={`cell ${d.id}`}>
        <path
          className={cell.cell}
          d={getRasterCell(d.x, d.y, cellWidth)}
          onMouseEnter={() => this.setState({ cell: true, activeCell: d.id })}
          onMouseLeave={() => this.setState({ cell: false, activeCell: null })}
        />
        <text
          className={this.state.activeCell === d.id ? cell.active : cell.title}
          x={d.x}
          y={d.y}
          textAnchor="middle"
        >
          {`cell ${d.id}`}
        </text>
      </g>
    ));

    const patches = data.patches.map(d => (
      <g key={`patch ${d.id}`}>
        <path
          className={patch.patch}
          d={`M ${data.nodes[d.nodes[0]].x} ${data.nodes[d.nodes[0]].y} ${data.nodes[d.nodes[1]].x} ${data.nodes[d.nodes[1]].y} ${data.nodes[d.nodes[2]].x} ${data.nodes[d.nodes[2]].y} ${data.nodes[d.nodes[3]].x} ${data.nodes[d.nodes[3]].y} Z`}
          onMouseEnter={() => this.setState({ patch: true, activePatch: d.id })}
          onMouseLeave={() => this.setState({ patch: false, activePatch: null })}
        />
        <text
          className={this.state.activeCell === d.id ? patch.active : patch.title}
          x={d.x}
          y={d.y}
          textAnchor="middle"
        >
          {`patch ${d.id}`}
        </text>
      </g>
    ),
    );

    // const faces = data.faces.map(d => (
    //   <g key={`face ${d.id}`}>
    //     <line
          //   className={face.face}
          //   x1={data.nodes[d.tail_node].x}
          //   x2={data.nodes[d.head_node].x}
          //   y1={data.nodes[d.tail_node].x}
          //   y2={data.nodes[d.head_node].x}
          // />
    //   </g>
    // ));

    const links = data.links.map(d => (
      <g key={`link ${d.id}`}>
        <line className={link.link} x1={data.nodes[d.tail_node].x} x2={data.nodes[d.head_node].x} y1={data.nodes[d.tail_node].y} y2={data.nodes[d.head_node].y} stroke="hotpink" fill="none" />
      </g>
    ));

    return (
      <svg className={grid.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="60vw" >
        <rect x={0} y={0} width={chartWidth} height={chartHeight} stroke="black" fill="none" strokeWidth={0.2} />
        <g transform={`translate(${margin.top} ${margin.left})`} >
          {patches}
          {cells}
          {links}
          {nodes}
        </g>
      </svg>
    );
  }
}


// <text className={this.state.activeNode === d.id ? grid.active : grid.title } x={d.x} y={d.y} textAnchor="middle" >{`node ${d.id}`}</text>
//
// const Grid = ({ data }) => {
//   const margin = { top: 10, right: 10, bottom: 10, left: 10 };
//   const row = 3;
//   const col = 4;
//   const height = (row + 1) * 10;
//   const width = (col + 1) * 10;
//
//   const nodeClassName = classNames(
//     grid.node,
//     this.state.node && grid.highlight,
//
//   )
//
//   const addHighlightClass = e => (
//
//   );
//
//
//   const circles = data.nodes.map(d => (
//     <circle className={nodeClassName} key={d.id} cx={d.x} cy={d.y} r={0.2} title={`node ${d.id}`} fill="teal" onMouseEnter={() => this.setState({ node: true })} onMouseLeave={() => this.setState({ node: false })} />
//     ),
//   );
//   const nodes = circles.map(c => c);
//
//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} width="60vw" >
//       <rect x={0} y={0} width={width} height={height} stroke="black" fill="none" strokeWidth={0.2} />
//       <g transform={`translate(${margin.top} ${margin.left})`} >
//         {nodes}
//       </g>
//     </svg>
//   );
// };


export default Grid;
