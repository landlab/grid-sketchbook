import React from 'react';
import axios from 'axios';
import Grid from './grid';
import Legend from './legend';
import Inputs from './inputs';

import app from '../theme/app.scss';

const apiBase = 'http://0.0.0.0:8080';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showCells: true,
      showCellLabels: false,
      showPatches: true,
      showPatchLabels: false,
      showLinks: true,
      showLinkLabels: false,
      showFaces: true,
      showFaceLabels: false,
      showNodes: true,
      showNodeLabels: false,
      showCorners: true,
      showCornerLabels: false,
      graph: {},
      grid: 'raster',
      rows: 4,
      cols: 6,
      spacing: 10,
    };
  }

  componentWillMount() {
    const APIurl =
      `${apiBase}/graphs/${this.state.grid}?shape=${this.state.rows},${this.state.cols}&spacing=${this.state.spacing}`;

    axios.get(APIurl)
    .then((response) => {
      this.setState({ graph: response.data.graph });
    });
  }

  componentDidUpdate(props, state) {
    const newGrid = this.state.grid !== state.grid;
    const newRows = this.state.rows !== state.rows;
    const newCols = this.state.cols !== state.cols;
    const newGraph = newGrid || newRows || newCols;
    const spacing = this.state.grid === 'hex' ? this.state.spacing : `${this.state.spacing},${this.state.spacing}`;
    const APIurl =
      `${apiBase}/graphs/${this.state.grid}?shape=${this.state.rows},${this.state.cols}&spacing=${spacing}`;

    if (newGraph) {
      axios.get(APIurl)
      .then((response) => {
        this.setState({ graph: response.data.graph });
      });
    }
  }

  updateGridValues(event) {
    const isString = isNaN(+event.target.value);
    this.setState({ [event.target.name]: isString ? event.target.value : +event.target.value });
  }

  toggleActiveLayers(event) {
    this.setState({ [event.target.value]: !this.state[event.target.value] });
  }

  render() {
    const activeLayers = {
      cells: this.state.showCells,
      cellLabels: this.state.showCellLabels,
      patches: this.state.showPatches,
      patchLabels: this.state.showPatchLabels,
      links: this.state.showLinks,
      linkLabels: this.state.showLinkLabels,
      faces: this.state.showFaces,
      faceLabels: this.state.showFaceLabels,
      nodes: this.state.showNodes,
      nodeLabels: this.state.showNodeLabels,
      corners: this.state.showCorners,
      cornerLabels: this.state.showCornerLabels,
    };

    return this.state.graph.data_vars ? (
      <div className={app.chart}>
        <Inputs
          grid={this.state.grid}
          rows={this.state.rows}
          cols={this.state.cols}
          onChange={e => this.updateGridValues(e)}
        />
        <Legend
          active={activeLayers}
          onChange={e => this.toggleActiveLayers(e)}
        />
        <h2>{this.state.grid.charAt(0).toUpperCase() + this.state.grid.slice(1)} Grid</h2>
        <Grid
          nodeX={this.state.graph.data_vars.x_of_node.data}
          nodeY={this.state.graph.data_vars.y_of_node.data}
          patchLinks={this.state.graph.data_vars.links_at_patch.data}
          cornerX={this.state.graph.data_vars.x_of_corner.data}
          cornerY={this.state.graph.data_vars.y_of_corner.data}
          cellFaces={this.state.graph.data_vars.faces_at_cell.data}
          linkLine={this.state.graph.data_vars.nodes_at_link.data}
          faceLine={this.state.graph.data_vars.corners_at_face.data}
          show={activeLayers}
          rows={this.state.rows}
          cols={this.state.cols}
          spacing={this.state.spacing * 1}
        />
      </div>
    ) : null;
  }
}

export default App;
