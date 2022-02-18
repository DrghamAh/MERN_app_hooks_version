import React from 'react';

function AlertMessage({type, content}) {
  return (
    <div className={`alert alert-${type}`}>
      <p>{content}</p>
    </div>
  );
}

export default AlertMessage;
