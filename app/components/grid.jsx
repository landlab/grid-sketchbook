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
    const {
      nodeX,
      nodeY,
      patchLinks,
      cornerX,
      cornerY,
      cellFaces,
      linkLine,
      faceLine,
      spacing,
      show,
      rows,
      cols,
    } = this.props;

    const margin = { top: (-spacing / 2), right: spacing, bottom: spacing, left: spacing };
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

    const corners = cornerX.map((d, i) => (
      <g key={`corner${-i}`}>
        <circle
          className={
            show.corners ? show.cornerLabels ? corner.highlight : corner.corner : corner.none
          }
          cx={xScale(d)}
          cy={yScale(cornerY[i])}
          r={0.7}
          onMouseEnter={() => this.setState({ corner: true, activeCorner: i })}
          onMouseLeave={() => this.setState({ corner: false, activeCorner: null })}
        />
        <text
          className={
            (this.state.activeCorner === i) || show.cornerLabels ? corner.activeLabel : corner.none
          }
          x={xScale(d)}
          dy={-1}
          y={yScale(cornerY[i])}
          textAnchor="middle"
        >
          corner {i}
        </text>
      </g>
      ),
    );

    const getPath = (verticies, element) => {
      const coordinates = verticies.map((c) => {
        if (element === 'node') {
          return `${xScale(nodeX[c])} ${yScale(nodeY[c])}`;
        } else if (element === 'corner') {
          return (`${xScale(cornerX[c])} ${yScale(cornerY[c])}`);
        }
        return null;
      });
      const d = `M ${coordinates} Z`;
      return d;
    };

    const getVerticies = (vector, element) => {
      let verticieSet;
      if (element === 'node') {
        verticieSet = new Set((vector.map(v => linkLine[v])).flat());
      }
      if (element === 'corner') {
        verticieSet = new Set((vector.map(v => faceLine[v])).flat());
      }
      return [...verticieSet];
    };

    const cellCorners = cellFaces.map(cellFace => getVerticies(cellFace, 'corner'));
    const patchNodes = patchLinks.map(patchLink => getVerticies(patchLink, 'node'));
    const cellTextPosition = cellCorners.map((d) => {
      const position =
        {
          x: xScale(cornerX[d[1]] - half),
          y: yScale(cornerY[d[1]] - (half / 2)),
        };
      return position;
    });

    const patchTextPosition = patchNodes.map((d) => {
      const position = d.length % 3 === 0 ?
      {
        x: xScale((nodeX[d[0]] + nodeX[d[1]] + nodeX[d[2]]) / 3),
        y: yScale((nodeY[d[0]] + nodeY[d[1]] + nodeY[d[2]]) / 3),
      } :
      {
        x: xScale(nodeX[d[1]] - half),
        y: yScale(nodeY[d[1]] - (half / 2)),
      };
      return position;
    });

    const cells = cellCorners.map((d, i) => (
      <g key={`cell${-i}`}>
        <path
          className={show.cells ? show.cellLabels ? cell.highlight : cell.cell : cell.none}
          d={getPath(d, 'corner')}
          fill="transparent"
          onMouseEnter={() => this.setState({ cell: true, activeCell: i })}
          onMouseLeave={() => this.setState({ cell: false, activeCell: null })}
        />
        <text
          className={
            (this.state.activeCell === i) || show.cellLabels ? cell.activeLabel : cell.none
          }
          x={cellTextPosition[i].x}
          y={cellTextPosition[i].y}
          textAnchor="middle"
        >
          cell {i}
        </text>
      </g>
    ));

    const patches = patchNodes.map((d, i) => (
      <g key={`patch${-i}`}>
        <path
          className={show.patches ? show.patchLabels ? patch.highlight : patch.patch : patch.none}
          d={getPath(d, 'node')}
          fill="transparent"
          onMouseEnter={() => this.setState({ patch: true, activePatch: i })}
          onMouseLeave={() => this.setState({ patch: false, activePatch: null })}
        />
        <text
          className={
            (this.state.activePatch === i) || show.patchLabels ? patch.activeLabel : patch.none
          }
          x={patchTextPosition[i].x}
          y={patchTextPosition[i].y}
          textAnchor="middle"
        >
          patch {i}
        </text>
      </g>
    ));

    const faces = faceLine.map((d, i) => {
      const vertical = cornerX[d[0]] === cornerX[d[1]];
      const textClassnames = classNames(
        (this.state.activeFace === i) || show.faceLabels ? face.activeLabel : face.none,
        vertical && face.vertical,
      );
      return (
        <g key={`face${-i}`}>
          <defs>
            <marker
              className={face.arrow}
              id="face"
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
            className={show.faces ? show.faceLabels ? face.highlight : face.face : face.none}
            x1={xScale(cornerX[d[0]])}
            x2={xScale(cornerX[d[1]])}
            y1={yScale(cornerY[d[0]])}
            y2={yScale(cornerY[d[1]])}
            markerEnd="url(#face)"
            onMouseEnter={() => this.setState({ face: true, activeFace: i })}
            onMouseLeave={() => this.setState({ face: false, activeFace: null })}
          />
          <text
            className={textClassnames}
            x={xScale((cornerX[d[0]] + cornerX[d[1]]) / 2)}
            y={yScale((cornerY[d[0]] + cornerY[d[1]]) / 2)}
            dx={vertical ? 0.1 : 0}
            dy={vertical ? 0 : 0.3}
            textAnchor="middle"
          >
            face {i}
          </text>
        </g>
      );
    },
  );

    const links = linkLine.map((d, i) => {
      const vertical = nodeX[d[0]] === nodeX[d[1]];
      const textClassnames = classNames(
        (this.state.activeLink === i) || show.linkLabels ? link.activeLabel : link.none,
        vertical && link.vertical,
      );

      return (
        <g key={`link${-i}`}>
          <defs>
            <marker
              className={link.arrow}
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
            x={xScale((nodeX[d[0]] + nodeX[d[1]]) / 2)}
            y={yScale((nodeY[d[0]] + nodeY[d[1]]) / 2)}
            dx={vertical ? 0.1 : 0}
            dy={vertical ? 0 : 0.3}
            textAnchor="middle"
          >
            link {i}
          </text>
        </g>
      );
    });

    return (
      <svg className={grid.chart} viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="80vw" >
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
  nodeX: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  nodeY: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  patchLinks: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  cornerX: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  cornerY: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  cellFaces: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  linkLine: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  faceLine: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
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
