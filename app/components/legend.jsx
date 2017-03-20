import React from 'react';

import legend from '../theme/legend.scss';


const Legend = (props) => (
  <div className={legend.container}>
    <div>
      <h2>Areas</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={props.active.cells ? legend.cellButtonDown : legend.button} onClick={props.onChange} value="showCells">Cells</button>
          <button className={props.active.cellLabels ? legend.cellButtonDown : legend.button} onClick={props.onChange} value="showCellLabels">Show IDs</button>
        </div>
        <div className={legend.column}>
          <button className={props.active.patches ? legend.patchButtonDown : legend.button} onClick={props.onChange} value="showPatches">Patches</button>
          <button className={props.active.patchLabels ? legend.patchButtonDown : legend.button} onClick={props.onChange} value="showPatchLabels">Show IDs</button>
        </div>
      </section>
    </div>
    <div>
      <h2>Vectors</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={props.active.links ? legend.linkButtonDown : legend.button} onClick={props.onChange} value="showLinks">Links</button>
          <button className={props.active.linkLabels ? legend.linkButtonDown : legend.button} onClick={props.onChange} value="showLinkLabels">Show IDs</button>
        </div>
        <div className={legend.column}>
          <button className={props.active.faces ? legend.faceButtonDown : legend.button} onClick={props.onChange} value="showFaces">Faces</button>
          <button className={props.active.faceLabels ? legend.faceButtonDown : legend.button} onClick={props.onChange} value="showFaceLabels">Show IDs</button>
        </div>
      </section>
    </div>
    <div>
      <h2>Points</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={props.active.nodes ? legend.nodeButtonDown : legend.button} onClick={props.onChange} value="showNodes">Nodes</button>
          <button className={props.active.nodeLabels ? legend.nodeButtonDown : legend.button} onClick={props.onChange} value="showNodeLabels">Show IDs</button>
        </div>
        <div className={legend.column}>
          <button className={props.active.corners ? legend.cornerButtonDown : legend.button} onClick={props.onChange} value="showCorners">Corners</button>
          <button className={props.active.cornerLabels ? legend.cornerButtonDown : legend.button} onClick={props.onChange} value="showCornerLabels">Show IDs</button>
        </div>
      </section>
    </div>
  </div>
);

export default Legend;

Legend.propTypes = {
  onChange: React.PropTypes.any,
}
