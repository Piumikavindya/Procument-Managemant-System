import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const breadcrumb = {
  backgroundColor: "white",
  border: "2px solid rgba(0,0,0,0.125)",
  borderRadius: "0.37rem",
  marginTop: "84px",
};

function Breadcrumb(props) {
  const [fontSize, setFontSize] = useState("1.5em");
  const [separatorMargin, setSeparatorMargin] = useState("0 0.5rem");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 780) {
        setFontSize("1.5em"); // Adjust the font size when height is less than 780
        setSeparatorMargin("0 0rem"); // Adjust the separator margin
      } else {
        setFontSize("1.5em"); // Reset font size when height is 780 or more
        setSeparatorMargin("0 0.5rem"); // Reset separator margin
      }
    };

    // Set initial styles
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function isLast(index) {
    return index === props.crumbs.length - 1;
  }

  const separatorStyle = {
    margin: separatorMargin,
    fontSize: fontSize,
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
              {!isLast(ci) && <span style={separatorStyle}>/</span>}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

export default Breadcrumb;
