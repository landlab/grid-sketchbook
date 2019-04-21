import React from 'react';

import inputs from '../theme/inputs.scss';

const Inputs = (props) => {
  const {
    grid,
    rows,
    cols,
    layout,
    orientation,
    onChange,
  } = props;

  return (
    <div>
      <form className={inputs.form}>
        <label className={inputs.label} htmlFor="grid">
        Grid Type
          <select className={inputs.select} name="grid" value={grid} onChange={onChange} >
            <option disabled value="" />
            <option value="raster">Raster</option>
            <option value="hex">Hex</option>
            <option value="radial">Radial</option>
          </select>
        </label>
        {grid === 'hex' && (
          <div className={inputs.hexOptions}>
            <label className={inputs.label} htmlFor="layout">
              Node Layout
              <select className={inputs.select} name="layout" value={layout} onChange={onChange} >
                <option disabled value="" />
                <option value="rect">Rectangular</option>
                <option value="hex">Hexagonal</option>
              </select>
            </label>
            <label className={inputs.label} htmlFor="orientation">
              Orientation
              <select className={inputs.select} name="orientation" value={orientation} onChange={onChange} >
                <option disabled value="" />
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </label>
          </div>
        )}
        { grid === 'radial' ?
          <label className={inputs.label} htmlFor="rows">
            Number of Rings
            <input className={inputs.input} type="number" max="5" min="1" placeholder="rows" name="rows" value={rows} onChange={onChange} />
          </label> :
          <label className={inputs.label} htmlFor="rows">
            Rows
            <input className={inputs.input} type="number" max="9" min="3" placeholder="rows" name="rows" value={rows} onChange={onChange} />
          </label>
        }
        <label className={inputs.label} htmlFor="cols">
          { grid === 'radial' ? 'Points in First Ring' : 'Columns'}
          <input className={inputs.input} type="number" max="9" min="0" placeholder="cols" name="cols" value={cols} onChange={onChange} />
        </label>
      </form>
    </div>
  );
};

Inputs.propTypes = {
  grid: React.PropTypes.string.isRequired,
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
  layout: React.PropTypes.string.isRequired,
  orientation: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default Inputs;
// <button type="submit">submit</button>
