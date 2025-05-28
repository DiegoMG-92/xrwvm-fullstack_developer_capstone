import React from 'react';

const PageHeader = ({ title }) => {
  return (
    <div
      className="container-fluid page-header mb-5 p-0"
      style={{ backgroundImage: "url(/img/carousel-bg-1.jpg)" }}
    >
      <div className="container-fluid page-header-inner py-5">
        <div className="container text-center">
          <h1 className="display-3 text-white mb-3 animated slideInDown">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;