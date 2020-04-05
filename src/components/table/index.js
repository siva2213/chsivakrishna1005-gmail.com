import React from "react";
import "./index.css";

export default props => {
  return (
    <table style={{ border: "1px solid #f5f5f5" }}>
      {props.rows &&
        props.rows.length &&
        props.rows.map((row, ind) => {
          return props.colId === 0 ? (
            <>
              <tr>
                <div className="featureHeader"> {row.title}</div>
              </tr>
              {row.features.map((subRow, ind1) => {
                return (
                  <tr>
                    <div className="featureItems">{subRow.featureName}</div>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              <tr>
                <div className="featureHeader"> &nbsp;</div>
              </tr>
              {row.features.map((subRow, ind1) => {
                return (
                  <tr>
                    <div className="featureItems">
                      {subRow.values[props.selectedItemKey[0].value]}
                    </div>
                  </tr>
                );
              })}
            </>
          );
        })}
    </table>
  );
};
