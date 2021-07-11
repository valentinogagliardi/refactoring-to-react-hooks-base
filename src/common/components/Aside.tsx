import React from "react";
//import PropTypes from "prop-types";

const Aside: React.FC = ({ children }) => {
  return <aside className="aside">{children}</aside>;
};

//Aside.propTypes = {
//children: PropTypes.arrayOf(PropTypes.element).isRequired,
//};

export default Aside;
