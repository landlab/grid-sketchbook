import React from 'react';

import legend from '../theme/legend.scss';


const Legend = (props) => (
  <div className={legend.container}>
    <div>
      <h2>Areas</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={props.active.cells ? legend.cellButtonDown : legend.button} onClick={props.onChange} value="showCells">Show Cells</button>
          <button className={props.active.highlightCells ? legend.cellButtonDown : legend.button} onClick={props.onChange} value="highlightCells">Highlight</button>
          <button className={props.active.cellLabels ? legend.cellButtonDown : legend.button} onClick={props.onChange} value="showCellLabels">Labels</button>
        </div>
        <div className={legend.column}>
          <button className={props.active.patches ? legend.patchButtonDown : legend.button} onClick={props.onChange} value="showPatches">Show Patches</button>
          <button className={props.active.highlightPatches ? legend.patchButtonDown : legend.button} onClick={props.onChange} value="highlightPatches">Highlight</button>
          <button className={props.active.patchLabels ? legend.patchButtonDown : legend.button} onClick={props.onChange} value="showPatchLabels">Labels</button>
        </div>
      </section>
    </div>
    <div>
      <h2>Vectors</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={props.active.links ? legend.linkButtonDown : legend.button} onClick={props.onChange} value="showLinks">Show Links</button>
          <button className={props.active.highlightLinks ? legend.linkButtonDown : legend.button} onClick={props.onChange} value="highlightLinks">Highlight</button>
          <button className={props.active.linkLabels ? legend.linkButtonDown : legend.button} onClick={props.onChange} value="showLinkLabels">Labels</button>
        </div>
        <div className={legend.column}>
          <button className={props.active.faces ? legend.faceButtonDown : legend.button} onClick={props.onChange} value="showFaces">Show Faces</button>
          <button className={props.active.highlightFaces ? legend.faceButtonDown : legend.button} onClick={props.onChange} value="highlightFaces">Highlight</button>
          <button className={props.active.faceLabels ? legend.faceButtonDown : legend.button} onClick={props.onChange} value="showFaceLabels">Labels</button>
        </div>
      </section>
    </div>
    <div>
      <h2>Points</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={props.active.nodes ? legend.nodeButtonDown : legend.button} onClick={props.onChange} value="showNodes">Show Nodes</button>
          <button className={props.active.highlightNodes ? legend.nodeButtonDown : legend.button} onClick={props.onChange} value="highlightNodes">Highlight</button>
          <button className={props.active.nodeLabels ? legend.nodeButtonDown : legend.button} onClick={props.onChange} value="showNodeLabels">Labels</button>
        </div>
        <div className={legend.column}>
          <button className={props.active.corners ? legend.cornerButtonDown : legend.button} onClick={props.onChange} value="showCorners">Show Corners</button>
          <button className={props.active.highlightCorners ? legend.cornerButtonDown : legend.button} onClick={props.onChange} value="highlightCorners">Highlight</button>
          <button className={props.active.cornerLabels ? legend.cornerButtonDown : legend.button} onClick={props.onChange} value="showCornerLabels">Labels</button>
        </div>
      </section>
    </div>
  </div>
);

export default Legend;

Legend.propTypes = {
  onChange: React.PropTypes.any,
}
