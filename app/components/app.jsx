import React from 'react';
import Grid from './grid.jsx';
import Legend from './legend.jsx';
import raster from '../landlab_raster_grid_example.json';
import hex from '../landlab_hex_grid_example.json';

import app from '../theme/app.scss';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showCells: true,
      highlightCells: false,
      showCellLabels: false,
      showPatches: true,
      highlightPatches: false,
      showPatchLabels: false,
      showLinks: true,
      highlightLinks: false,
      showLinkLabels: false,
      showFaces: true,
      highlightFaces: false,
      showFaceLabels: false,
      showNodes: true,
      highlightNodes: false,
      showNodeLabels: false,
      showCorners: true,
      highlightCorners: false,
      showCornerLabels: false,
    };
  }

  render() {
    const activeLayers = {
      cells: this.state.showCells,
      highlightCells: this.state.highlightCells,
      cellLabels: this.state.showCellLabels,
      patches: this.state.showPatches,
      highlightPatches: this.state.highlightPatches,
      patchLabels: this.state.showPatchLabels,
      links: this.state.showLinks,
      highlightLinks: this.state.highlightLinks,
      linkLabels: this.state.showLinkLabels,
      faces: this.state.showFaces,
      highlightFaces: this.state.highlightFaces,
      faceLabels: this.state.showFaceLabels,
      nodes: this.state.showNodes,
      highlightNodes: this.state.highlightNodes,
      nodeLabels: this.state.showNodeLabels,
      corners: this.state.showCorners,
      highlightCorners: this.state.highlightCorners,
      cornerLabels: this.state.showCornerLabels,
    };
    console.log('show', activeLayers);
    return (
      <div className={app.chart}>
        <Legend active={activeLayers} onChange={e => this.setState({ [e.target.value]: !this.state[e.target.value] })} />
        <h2>Raster Grid</h2>
        <Grid data={raster} show={activeLayers} />
        <h2>Hex Grid</h2>
        <Grid data={hex} show={activeLayers} />
      </div>
    );
  }
}

export default App;
