import React from 'react';
import './Count.scss';

const Count = props => {
  const { count, setCount } = props;
  const minusCount = () => {
    count > 1 && setCount(prev => prev - 1);
  };

  const plusCount = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div className="count">
      <div className="countInput">
        <button className="minusCount" onClick={minusCount}>
          —
        </button>
        <span className="countInputText">{count}</span>
        <button className="plusCount" onClick={plusCount}>
          +
        </button>
      </div>
    </div>
  );
};

export default Count;
