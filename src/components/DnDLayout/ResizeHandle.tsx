import React from 'react';
import './ResizeHandle.css';

export type HandleAxisProps = {
  handleAxis?: 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';
};

const ResizeHandle = React.forwardRef<HTMLDivElement, HandleAxisProps>(
  ({ handleAxis, ...props }, ref) => {
    return (
      <div
        className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
        ref={ref}
        {...props}
      >
        {handleAxis === 's' && <div className="custom-handle"></div>}
      </div>
    );
  }
);

ResizeHandle.displayName = 'ResizeHandle';

export default ResizeHandle;
