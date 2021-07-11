import React from "react";
//import PropTypes from "prop-types";

const Layout: React.FC = ({ children }) => {
  return <div className="grid">{children}</div>;
};

//Layout.propTypes = {
//children: PropTypes.arrayOf(PropTypes.element)
//};

export default Layout;
