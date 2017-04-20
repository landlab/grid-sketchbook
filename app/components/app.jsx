import React from 'react';
import Grid from './grid';
import Legend from './legend';
import { graph } from '../landlab_raster_grid_example.json';
import hex from '../landlab_hex_grid_example.json';

import app from '../theme/app.scss';


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
    };
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
    return (
      <div className={app.chart}>
        <Legend active={activeLayers} onChange={e => this.setState({ [e.target.value]: !this.state[e.target.value] })} />
        <h2>Raster Grid</h2>
        <Grid nodeX={graph.data_vars.x_of_node.data} nodeY={graph.data_vars.y_of_node.data} nodeArea={graph.data_vars.nodes_at_patch.data} linkLine={graph.data_vars.nodes_at_link.data} show={activeLayers} spacing={10} />
      </div>
    );
  }
}

export default App;
