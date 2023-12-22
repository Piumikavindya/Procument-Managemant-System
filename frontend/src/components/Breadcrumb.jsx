import React from "react";
import { Link } from "react-router-dom";

const breadcrumb = {
  backgroundColor: "white",
  border: "2px solid rgba(0,0,0,0.125)",
  borderRadius: "0.37rem"
};

function Breadcrumb(props) {
  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  const separatorStyle = {
    margin: "0 0.5rem",
    fontSize: "1.5em", // Adjust the font size to increase the size of the /
  };

  return (
    <nav aria-label="breadcrumb">
      <div className="breadcrumb" style={breadcrumb}>
        {props.crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? "disabled" : "";

          return (
            <React.Fragment key={ci}>
              <li className="breadcrumb-item align-items-center">
                <Link to={crumb.link} className={`btn btn-link ${disabled}`}>
                  {crumb.label}
                </Link>
              </li>
              {!isLast(ci) && (
                <span style={separatorStyle}>/</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

export default Breadcrumb;
