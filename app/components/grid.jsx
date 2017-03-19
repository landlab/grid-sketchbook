import React from 'react';
// import * as d3 from 'd3';
// import raster from '../landlab_raster_grid_example.json';
import classNames from 'classnames';

import grid from '../theme/grid.scss';
import node from '../theme/node.scss';
import cell from '../theme/cell.scss';
import link from '../theme/link.scss';
import patch from '../theme/patch.scss';
import corner from '../theme/corner.scss';
import face from '../theme/face.scss';

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      node: false,
      activeNode: null,
      cell: false,
      activeCell: null,
      face: false,
      activeFace: null,
      link: false,
      activeLink: null,
      patch: false,
      activePatch: null,
      corner: false,
      activeCorner: null,
    };
  }

  render() {
    const { data } = this.props;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const row = 3;
    const col = 4;
    const chartHeight = (row + 1) * 10;
    const chartWidth = (col + 1) * 10;

    const nodes = data.nodes.map(d => (
      <g key={`node ${d.id}`}>
        <circle
          className={node.node}
          cx={d.x}
          cy={d.y}
          r={0.7}
          title={`node ${d.id}`}
          onMouseEnter={() => this.setState({ node: true, activeNode: d.id })}
          onMouseLeave={() => this.setState({ node: false, activeNode: null })}
        />
        <text
          className={this.state.activeNode === d.id ? grid.active : grid.title}
          x={d.x}
          dy={-2}
          y={d.y}
          textAnchor="middle"
        >
          {`node ${d.id}`}
        </text>
      </g>
      ),
    );

    const corners = data.corners.map(d => (
      <g key={`corner ${d.id}`}>
        <circle
          className={corner.corner}
          cx={d.x}
          cy={d.y}
          r={0.7}
          title={`corner ${d.id}`}
          onMouseEnter={() => this.setState({ corner: true, activeCorner: d.id })}
          onMouseLeave={() => this.setState({ corner: false, activeCorner: null })}
        />
        <text className={this.state.activeCorner === d.id ? grid.active : grid.title} x={d.x} dy={-2} y={d.y} textAnchor="middle" >{`corner ${d.id}`}</text>
      </g>
      ),
    );

    const getPath = (verticies, vertex) => {
      const allCorners = verticies.map(c => (`${data[vertex][c].x} ${data[vertex][c].y}`));
      const d = `M ${allCorners} Z`;
      return d;
    };

    const cells = data.cells.map(d => (
      <g key={`cell ${d.id}`}>
        <path
          className={cell.cell}
          d={getPath(d.corners, 'corners')}
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
          d={getPath(d.nodes, 'nodes')}
          onMouseEnter={() => this.setState({ patch: true, activePatch: d.id })}
          onMouseLeave={() => this.setState({ patch: false, activePatch: null })}
        />
        <text
          className={this.state.activePatch === d.id ? patch.active : patch.title}
          x={data.corners[d.id].x}
          y={data.corners[d.id].y}
          textAnchor="middle"
        >
          {`patch ${d.id}`}
        </text>
      </g>
  ));

    const faces = data.faces.map(d => (
      <g key={`face ${d.id}`}>
        <line
          className={face.face}
          x1={data.corners[d.tail_corner].x}
          x2={data.corners[d.head_corner].x}
          y1={data.corners[d.tail_corner].y}
          y2={data.corners[d.head_corner].y}
          onMouseEnter={() => this.setState({ face: true, activeFace: d.id })}
          onMouseLeave={() => this.setState({ face: false, activeFace: null })}

        />
        <text
          className={this.state.activeFace === d.id ? face.active : face.title}
          x={d.x}
          y={d.y}
          textAnchor="middle"
        >
          {`face ${d.id}`}
        </text>

      </g>
    ));

    const links = data.links.map(d => (
      <g key={`link ${d.id}`}>
        <line
          className={link.link}
          x1={data.nodes[d.tail_node].x}
          x2={data.nodes[d.head_node].x}
          y1={data.nodes[d.tail_node].y}
          y2={data.nodes[d.head_node].y}
          onMouseEnter={() => this.setState({ link: true, activeLink: d.id })}
          onMouseLeave={() => this.setState({ link: false, activeLink: null })}
        />
        <text
          className={this.state.activeLink === d.id ? link.active : link.title}
          x={d.x}
          y={d.y}
          textAnchor="middle"
        >
          {`link ${d.id}`}
        </text>
      </g>
    ));

    return (
      <svg className={grid.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="60vw" >
        <rect x={0} y={0} width={chartWidth} height={chartHeight} stroke="black" fill="none" strokeWidth={0.2} />
        <g transform={`translate(${margin.top} ${margin.left})`} >
          {patches}
          {cells}
          {links}
          {faces}
          {nodes}
          {corners}
        </g>
      </svg>
    );
  }
}

export default Grid;
