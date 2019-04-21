import React from 'react';

import inputs from '../theme/inputs.scss';

const Inputs = (props) => {
  const {
    grid,
    rows,
    cols,
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
        <label className={inputs.label} htmlFor="rows">
          Rows
          <input className={inputs.input} type="number" max="9" min="3" placeholder="rows" name="rows" value={rows} onChange={onChange} />
        </label>
        <label className={inputs.label} htmlFor="cols">
          Columns
          <input className={inputs.input} type="number" max="9" min="3" placeholder="cols" name="cols" value={cols} onChange={onChange} />
        </label>
      </form>
    </div>
  );
};

Inputs.propTypes = {
  grid: React.PropTypes.string.isRequired,
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default Inputs;
// <button type="submit">submit</button>
