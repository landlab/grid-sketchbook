import React from 'react';
import * as d3 from 'd3';
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
    const { data, show } = this.props;
    const margin = { top: 2, right: 10, bottom: 5, left: 10 };
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
          className={show.nodes ? show.nodeLabels ? node.highlight : node.node : node.none}
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={0.7}
          onMouseEnter={() => this.setState({ node: true, activeNode: d.id })}
          onMouseLeave={() => this.setState({ node: false, activeNode: null })}
        />
        <text
          className={
            (this.state.activeNode === d.id) || show.nodeLabels ? node.activeLabel : node.none
          }
          x={xScale(d.x)}
          dy={-1}
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
          className={
            show.corners ? show.cornerLabels ? corner.highlight : corner.corner : corner.none
          }
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={0.7}
          onMouseEnter={() => this.setState({ corner: true, activeCorner: d.id })}
          onMouseLeave={() => this.setState({ corner: false, activeCorner: null })}
        />
        <text
          className={
            (this.state.activeCorner === d.id) || show.cornerLabels ? corner.activeLabel : corner.none
          }
          x={xScale(d.x)}
          dy={-1}
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
          className={show.cells ? show.cellLabels ? cell.highlight : cell.cell : cell.none}
          d={getPath(d.corners, 'corners')}
          fill="transparent"
          onMouseEnter={() => this.setState({ cell: true, activeCell: d.id })}
          onMouseLeave={() => this.setState({ cell: false, activeCell: null })}
        />
        <text
          className={
            (this.state.activeCell === d.id) || show.cellLabels ? cell.activeLabel : cell.none
          }
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
          className={show.patches ? show.patchLabels ? patch.highlight : patch.patch : patch.none}
          d={getPath(d.nodes, 'nodes')}
          fill="transparent"
          onMouseEnter={() => this.setState({ patch: true, activePatch: d.id })}
          onMouseLeave={() => this.setState({ patch: false, activePatch: null })}
        />
        <text
          className={
            (this.state.activePatch === d.id) || show.patchLabels ? patch.activeLabel : patch.none
          }
          x={xScale(data.corners[d.id].x)}
          y={yScale(data.corners[d.id].y)}
          textAnchor="middle"
        >
          {`patch ${d.id}`}
        </text>
      </g>
    ));

    const faces = data.faces.map((d) => {
      const vertical = data.corners[d.tail_corner].x === data.corners[d.head_corner].x;
      const textClassnames = classNames(
        (this.state.activeFace === d.id) || show.faceLabels ? face.activeLabel : face.none,
        vertical && face.vertical,
      );
      return (
        <g key={`face ${d.id}`}>
          <defs>
            <marker className={face.arrow} id="face" orient="auto" viewBox="-6 -6 12 12" refX={5} refY={0} markerHeight={2}>
              <path d="M -4 -4 0 0 -4 4" />
            </marker>
          </defs>
          <line
            className={show.faces ? show.faceLabels ? face.highlight : face.face : face.none}
            x1={xScale(data.corners[d.tail_corner].x)}
            x2={xScale(data.corners[d.head_corner].x)}
            y1={yScale(data.corners[d.tail_corner].y)}
            y2={yScale(data.corners[d.head_corner].y)}
            markerEnd="url(#face)"
            onMouseEnter={() => this.setState({ face: true, activeFace: d.id })}
            onMouseLeave={() => this.setState({ face: false, activeFace: null })}

          />
          <text
            className={textClassnames}
            x={xScale(d.x)}
            y={yScale(d.y)}
            dy={0.3}
            textAnchor="middle"
          >
            {`face ${d.id}`}
          </text>
        </g>
      );
    },
  );

    const links = data.links.map((d) => {
      const vertical = data.nodes[d.tail_node].x === data.nodes[d.head_node].x;
      const textClassnames = classNames(
        (this.state.activeLink === d.id) || show.linkLabels ? link.activeLabel : link.none,
        vertical && link.vertical,
      );

      return (
        <g key={`link ${d.id}`}>
          <defs>
            <marker className={link.arrow} id="head" orient="auto" viewBox="-6 -6 12 12" refX={5} refY={0} markerHeight={2}>
              <path d="M -4 -4 0 0 -4 4" />
            </marker>
          </defs>

          <line
            className={show.links ? show.linkLabels ? link.highlight : link.link : link.none}
            x1={xScale(data.nodes[d.tail_node].x)}
            x2={xScale(data.nodes[d.head_node].x)}
            y1={yScale(data.nodes[d.tail_node].y)}
            y2={yScale(data.nodes[d.head_node].y)}
            markerEnd="url(#head)"
            onMouseEnter={() => this.setState({ link: true, activeLink: d.id })}
            onMouseLeave={() => this.setState({ link: false, activeLink: null })}
          />
          <text
            className={textClassnames}
            x={xScale(d.x)}
            y={yScale(d.y)}
            dy={0.3}
            textAnchor="middle"
          >
            {`link ${d.id}`}
          </text>
        </g>
      );
    });

    return (
      <svg className={grid.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="60vw" >
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
    cells: React.PropTypes.array,
    corners: React.PropTypes.array,
    faces: React.PropTypes.array,
    links: React.PropTypes.array,
    nodes: React.PropTypes.array,
    patches: React.PropTypes.array,
  }).isRequired,
  show: React.PropTypes.shape({
    cells: React.PropTypes.bool,
    cellLabels: React.PropTypes.bool,
    patches: React.PropTypes.bool,
    patchLabels: React.PropTypes.bool,
    links: React.PropTypes.bool,
    linkLabels: React.PropTypes.bool,
    faces: React.PropTypes.bool,
    faceLabels: React.PropTypes.bool,
    nodes: React.PropTypes.bool,
    nodeLabels: React.PropTypes.bool,
    corners: React.PropTypes.bool,
    cornerLabels: React.PropTypes.bool,
  }).isRequired,
};

export default Grid;
