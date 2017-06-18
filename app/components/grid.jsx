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
    const { nodeX, nodeY, nodeArea, linkLine, spacing, show, rows, cols } = this.props;
    const margin = { top: 0, right: spacing, bottom: spacing, left: spacing };
    const row = rows;
    const col = cols;
    const cellWidth = spacing;
    const innerHeight = (row) * cellWidth;
    const innerWidth = (col) * cellWidth;
    const chartHeight = innerHeight + margin.top + margin.bottom;
    const chartWidth = innerWidth + margin.left + margin.right;
    const half = spacing / 2;

    const xScale = d3.scaleLinear()
      .domain([0, innerWidth])
      .range([half, innerWidth + half]);

    const yScale = d3.scaleLinear()
      .domain([0, innerHeight])
      .range([innerHeight, 0]);

    const nodes = nodeX.map((d, i) => (
      <g key={`node${-i}`}>
        <circle
          className={show.nodes ? show.nodeLabels ? node.highlight : node.node : node.none}
          cx={xScale(d)}
          cy={yScale(nodeY[i])}
          r={0.7}
          onMouseEnter={() => this.setState({ node: true, activeNode: i })}
          onMouseLeave={() => this.setState({ node: false, activeNode: null })}
        />
        <text
          className={
            (this.state.activeNode === i) || show.nodeLabels ? node.activeLabel : node.none
          }
          x={xScale(d)}
          dy={-1}
          y={yScale(nodeY[i])}
          textAnchor="middle"
        >
          node {i}
        </text>
      </g>
      ),
    );

    // const corners = graph.corners.map(d => (
    //   <g key={`corner ${d.id}`}>
    //     <circle
    //       className={
    //         show.corners ? show.cornerLabels ? corner.highlight : corner.corner : corner.none
    //       }
    //       cx={xScale(d.x)}
    //       cy={yScale(d.y)}
    //       r={0.7}
    //       onMouseEnter={() => this.setState({ corner: true, activeCorner: d.id })}
    //       onMouseLeave={() => this.setState({ corner: false, activeCorner: null })}
    //     />
    //     <text
    //       className={
    //         (this.state.activeCorner === d.id) || show.cornerLabels ? corner.activeLabel : corner.none
    //       }
    //       x={xScale(d.x)}
    //       dy={-1}
    //       y={yScale(d.y)}
    //       textAnchor="middle"
    //     >
    //       {`corner ${d.id}`}
    //     </text>
    //   </g>
    //   ),
    // );

    const getPath = (verticies) => {
      const allCorners = verticies.map(c => (`${xScale(nodeX[c])} ${yScale(nodeY[c])}`));
      const d = `M ${allCorners} Z`;
      return d;
    };

    // const cells = graph.cells.map(d => (
    //   <g key={`cell ${d.id}`}>
    //     <path
    //       className={show.cells ? show.cellLabels ? cell.highlight : cell.cell : cell.none}
    //       d={getPath(d.corners, 'corners')}
    //       fill="transparent"
    //       onMouseEnter={() => this.setState({ cell: true, activeCell: d.id })}
    //       onMouseLeave={() => this.setState({ cell: false, activeCell: null })}
    //     />
    //     <text
    //       className={
    //         (this.state.activeCell === d.id) || show.cellLabels ? cell.activeLabel : cell.none
    //       }
    //       x={xScale(d.x)}
    //       y={yScale(d.y)}
    //       textAnchor="middle"
    //     >
    //       {`cell ${d.id}`}
    //     </text>
    //   </g>
    // ));

    const patches = nodeArea.map((d, i) => (
      <g key={`patch${-i}`}>
        <path
          className={show.patches ? show.patchLabels ? patch.highlight : patch.patch : patch.none}
          d={getPath(d)}
          fill="transparent"
          onMouseEnter={() => this.setState({ patch: true, activePatch: i })}
          onMouseLeave={() => this.setState({ patch: false, activePatch: null })}
        />
        <text
          className={
            (this.state.activePatch === i) || show.patchLabels ? patch.activeLabel : patch.none
          }
          x={xScale(nodeX[d[0]] - half)}
          y={yScale(nodeY[d[0]] - half)}
          textAnchor="middle"
        >
          patch {i}
        </text>
      </g>
    ));
  //
  //   const faces = graph.faces.map((d) => {
  //     const vertical = graph.corners[d.tail_corner].x === graph.corners[d.head_corner].x;
  //     const textClassnames = classNames(
  //       (this.state.activeFace === d.id) || show.faceLabels ? face.activeLabel : face.none,
  //       vertical && face.vertical,
  //     );
  //     return (
  //       <g key={`face ${d.id}`}>
  //         <defs>
  //           <marker className={face.arrow} id="face" orient="auto" viewBox="-6 -6 12 12" refX={5} refY={0} markerHeight={2}>
  //             <path d="M -4 -4 0 0 -4 4" />
  //           </marker>
  //         </defs>
  //         <line
  //           className={show.faces ? show.faceLabels ? face.highlight : face.face : face.none}
  //           x1={xScale(graph.corners[d.tail_corner].x)}
  //           x2={xScale(graph.corners[d.head_corner].x)}
  //           y1={yScale(graph.corners[d.tail_corner].y)}
  //           y2={yScale(graph.corners[d.head_corner].y)}
  //           markerEnd="url(#face)"
  //           onMouseEnter={() => this.setState({ face: true, activeFace: d.id })}
  //           onMouseLeave={() => this.setState({ face: false, activeFace: null })}
  //
  //         />
  //         <text
  //           className={textClassnames}
  //           x={xScale(d.x)}
  //           y={yScale(d.y)}
  //           dy={0.3}
  //           textAnchor="middle"
  //         >
  //           {`face ${d.id}`}
  //         </text>
  //       </g>
  //     );
  //   },
  // );
  //
    const links = linkLine.map((d, i) => {
      const vertical = nodeX[d[0]] === nodeX[d[1]];
      const textClassnames = classNames(
        (this.state.activeLink === i) || show.linkLabels ? link.activeLabel : link.none,
        // vertical && link.vertical,
      );

      return (
        <g key={`link${-i}`}>
          <defs>
            <marker
              className={(show.links || show.linkLabels) && link.arrow}
              id="head"
              orient="auto"
              viewBox="-6 -6 12 12"
              refX={5}
              refY={0}
              markerHeight={2}
            >
              <path d="M -4 -4 0 0 -4 4" />
            </marker>
          </defs>

          <line
            className={show.links ? show.linkLabels ? link.highlight : link.link : link.none}
            x1={xScale(nodeX[d[0]])}
            x2={xScale(nodeX[d[1]])}
            y1={yScale(nodeY[d[0]])}
            y2={yScale(nodeY[d[1]])}
            markerEnd="url(#head)"
            onMouseEnter={() => this.setState({ link: true, activeLink: i })}
            onMouseLeave={() => this.setState({ link: false, activeLink: null })}
          />
          <text
            className={textClassnames}
            x={xScale(nodeX[d[0]])}
            y={yScale(nodeY[d[0]])}
            dx={half}
            dy={0.3}
            textAnchor="middle"
          >
            link {i}
          </text>
        </g>
      );
    });

  // {patches}
  // {cells}
  // {links}
  // {faces}
  // {nodes}
  // {corners}


    return (
      <svg className={grid.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="60vw" >
        <g transform={`translate(${margin.left} ${margin.top})`} >
          {patches}
          {links}
          {nodes}
        </g>
      </svg>
    );
  }
}

Grid.propTypes = {
  nodeX: React.PropTypes.array.isRequired,
  nodeY: React.PropTypes.array.isRequired,
  nodeArea: React.PropTypes.array.isRequired,
  linkLine: React.PropTypes.array.isRequired,
  spacing: React.PropTypes.number.isRequired,
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
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
