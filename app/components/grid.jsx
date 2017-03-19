import React from 'react';
import * as d3 from 'd3';
// import classNames from 'classnames';

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
    const margin = { top: 20, right: 10, bottom: 10, left: 10 };
    const row = 3;
    const col = 4;
    const cellWidth = 10;
    const innerHeight = (row - 1) * cellWidth;
    const innerWidth = (col - 1) * cellWidth;
    const chartHeight = innerHeight + margin.top + margin.bottom;
    const chartWidth = innerWidth + margin.left + margin.right;

    const xScale = d3.scaleLinear()
      .domain([0, innerWidth])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, innerHeight])
      .range([innerHeight, 0]);

    const nodes = data.nodes.map(d => (
      <g key={`node ${d.id}`}>
        <circle
          className={node.node}
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={0.7}
          title={`node ${d.id}`}
          onMouseEnter={() => this.setState({ node: true, activeNode: d.id })}
          onMouseLeave={() => this.setState({ node: false, activeNode: null })}
        />
        <text
          className={this.state.activeNode === d.id ? node.active : node.title}
          x={xScale(d.x)}
          dy={-2}
          y={yScale(d.y)}
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
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={0.7}
          title={`corner ${d.id}`}
          onMouseEnter={() => this.setState({ corner: true, activeCorner: d.id })}
          onMouseLeave={() => this.setState({ corner: false, activeCorner: null })}
        />
        <text
          className={this.state.activeCorner === d.id ? corner.active : corner.title}
          x={xScale(d.x)}
          dy={-2}
          y={yScale(d.y)}
          textAnchor="middle"
        >
          {`corner ${d.id}`}
        </text>
      </g>
      ),
    );

    const getPath = (verticies, vertex) => {
      const allCorners = verticies.map(c => (`${xScale(data[vertex][c].x)} ${yScale(data[vertex][c].y)}`));
      // console.log(allCorners);
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
          x={xScale(d.x)}
          y={yScale(d.y)}
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
          x={xScale(data.corners[d.id].x)}
          y={yScale(data.corners[d.id].y)}
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
          x1={xScale(data.corners[d.tail_corner].x)}
          x2={xScale(data.corners[d.head_corner].x)}
          y1={yScale(data.corners[d.tail_corner].y)}
          y2={yScale(data.corners[d.head_corner].y)}
          onMouseEnter={() => this.setState({ face: true, activeFace: d.id })}
          onMouseLeave={() => this.setState({ face: false, activeFace: null })}

        />
        <text
          className={this.state.activeFace === d.id ? face.active : face.title}
          x={xScale(d.x)}
          y={yScale(d.y)}
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
          x1={xScale(data.nodes[d.tail_node].x)}
          x2={xScale(data.nodes[d.head_node].x)}
          y1={yScale(data.nodes[d.tail_node].y)}
          y2={yScale(data.nodes[d.head_node].y)}
          onMouseEnter={() => this.setState({ link: true, activeLink: d.id })}
          onMouseLeave={() => this.setState({ link: false, activeLink: null })}
        />
        <text
          className={this.state.activeLink === d.id ? link.active : link.title}
          x={xScale(d.x)}
          y={yScale(d.y)}
          textAnchor="middle"
        >
          {`link ${d.id}`}
        </text>
      </g>
    ));

    return (
      <svg className={grid.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="60vw" >
        <rect x={0} y={0} width={chartWidth} height={chartHeight} stroke="black" fill="none" strokeWidth={0.2} />
        <g transform={`translate(${margin.left} ${margin.top})`} >
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

Grid.propTypes = {
  data: React.PropTypes.shape({
    // cells: React.PropsTypes.array,
    // corners: React.PropsTypes.array,
    // faces: React.PropsTypes.array,
    // links: React.PropsTypes.array,
    // nodes: React.PropsTypes.array,
    // patches: React.PropsTypes.array,
  }).isRequired,
};

export default Grid;
