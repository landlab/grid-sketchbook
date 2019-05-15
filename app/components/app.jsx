import React from 'react';
import axios from 'axios';
import Grid from './grid';
import Legend from './legend';
import Inputs from './inputs';

import app from '../theme/app.scss';

// TODO: change this to the deployed URL!
const apiBase = 'https://siwenna.colorado.edu:8000';

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
      rows: 3,
      cols: 4,
      spacing: 10,
      layout: 'hex',
      orientation: 'horizontal',
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
    const newLayout = this.state.layout !== state.layout;
    const newOrientation = this.state.orientation !== state.orientation;
    const spacing = this.state.grid === 'hex' || 'radial' ? this.state.spacing : `${this.state.spacing},${this.state.spacing}`;
    const layoutQuery = this.state.grid === 'hex' ? `&node_layout=${this.state.layout}` : '';
    const orientationQuery = this.state.grid === 'hex' ? `&orientation=${this.state.orientation}` : '';
    const newGraph = newGrid || newRows || newCols || newLayout || newOrientation;
    const APIurl =
      `${apiBase}/graphs/${this.state.grid}?shape=${this.state.rows},${this.state.cols}&spacing=${spacing}${layoutQuery}${orientationQuery}`;

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
          layout={this.state.layout}
          orientation={this.state.orientation}
          onChange={e => this.updateGridValues(e)}
        />
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
          spacing={this.state.spacing * 1}
        />
        <Legend
          active={activeLayers}
          onChange={e => this.toggleActiveLayers(e)}
        />
      </div>
    ) : null;
  }
}

export default App;
