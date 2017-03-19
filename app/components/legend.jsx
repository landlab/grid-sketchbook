import React from 'react';

import legend from '../theme/legend.scss';


const Legend = (props) => (
  <div className={legend.container}>
    <div>
      <h2>Areas</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={legend.cellButton} onClick={props.onChange}>Cells</button>
          <button className={legend.cellLabelButton}>Labels</button>
        </div>
        <div className={legend.column}>
          <button className={legend.patchButton}>Patches</button>
          <button className={legend.patchLabelButton}>Labels</button>
        </div>
      </section>
    </div>
    <div>
      <h2>Vectors</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={legend.linkButton}>Links</button>
          <button className={legend.linkLabelButton}>Labels</button>
        </div>
        <div className={legend.column}>
          <button className={legend.faceButton}>Faces</button>
          <button className={legend.faceLabelButton}>Labels</button>
        </div>
      </section>
    </div>
    <div>
      <h2>Points</h2>
      <section className={legend.section}>
        <div className={legend.column}>
          <button className={legend.nodeButton}>Nodes</button>
          <button className={legend.nodeLabelButton}>Labels</button>
        </div>
        <div className={legend.column}>
          <button className={legend.cornerButton}>Corners</button>
          <button className={legend.cornerLabelButton}>Labels</button>
        </div>
      </section>
    </div>
  </div>
);

export default Legend;
