import ReactGridLayout, { ReactGridLayoutProps } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

import './GridLayout.css';
import GridTile, { ExtendedLayoutItem, SetWidgetAttribute } from './GridTile';
import { useState } from 'react';
import { WidgetTypes } from '../Widgets/widgetTypes';
import {
  widgetDefaultHeight,
  widgetDefaultWidth,
  widgetMaxHeight,
  widgetMinHeight,
} from '../Widgets/widgetDefaults';
import ResizeHandle from './ResizeHandle';

const initialLayout = [
  { title: 'Widget 1', i: 'LargeWidget#lw1', x: 0, y: 0 },
  { title: 'Widget 1', i: 'LargeWidget#lw2', x: 0, y: 1 },
  { title: 'Widget 1', i: 'LargeWidget#lw3', x: 0, y: 2 },
  { title: 'Widget 1', i: 'MediumWidget#mw1', x: 4, y: 2 },
  { title: 'Widget 1', i: 'SmallWidget#sw1', x: 4, y: 0 },
  { title: 'Widget 1', i: 'SmallWidget#sw2', x: 4, y: 1 },
];

function isWidgetType(type: string): type is WidgetTypes {
  return Object.values(WidgetTypes).includes(type as WidgetTypes);
}

function getWidgetDefaultSettings(id: string): [WidgetTypes, string] {
  const [widgetType, i] = id.split('#');
  // we will need some type guards here and schema validation to remove unknown widgets
  return [widgetType as WidgetTypes, i];
}

const GridLayout = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [layout, setLayout] = useState<ExtendedLayoutItem[]>(
    initialLayout.map((item) => {
      const [widgetType] = getWidgetDefaultSettings(item.i);
      return {
        ...item,
        w: widgetDefaultWidth[widgetType],
        h: widgetDefaultHeight[widgetType],
        maxH: widgetMaxHeight[widgetType],
        minH: widgetMinHeight[widgetType],
        widgetType,
      };
    })
  );

  const setWidgetAttribute: SetWidgetAttribute = (id, attributeName, value) => {
    setLayout((prev) =>
      prev.map((item) =>
        item.i === id ? { ...item, [attributeName]: value } : item
      )
    );
  };

  const removeWidget = (id: string) => {
    setLayout((prev) => prev.filter((item) => item.i !== id));
  };

  const onDrop: ReactGridLayoutProps['onDrop'] = (
    _layout,
    layoutItem,
    event
  ) => {
    const data = (event as any).dataTransfer.getData('text');
    if (isWidgetType(data)) {
      const newWidget = {
        ...layoutItem,
        w: widgetDefaultWidth[data],
        h: widgetDefaultHeight[data],
        maxH: widgetMaxHeight[data],
        minH: widgetMinHeight[data],
        widgetType: data,
        i: `${data}#${Date.now() + Math.random()}`,
        title: 'New title',
      };
      setLayout((prev) => [...prev, newWidget]);
    }
    event.preventDefault();
  };

  return (
    // {/* relative position is required for the grid layout to properly calculate
    // child translation while dragging is in progress */}
    <div style={{ position: 'relative' }}>
      <ReactGridLayout
        className="layout"
        draggableHandle=".drag-handle"
        layout={layout}
        cols={4}
        rowHeight={88}
        width={1200}
        resizeHandles={['se', 's', 'sw']}
        resizeHandle={<ResizeHandle />}
        // add droppping item default based on dragged template
        // droppingItem={{ i: '__dropping-elem__' }}
        isDroppable
        onDrop={onDrop}
        onLayoutChange={(newLayout: ExtendedLayoutItem[]) => {
          setLayout(newLayout.filter(({ i }) => i !== '__dropping-elem__'));
        }}
      >
        {layout.map(({ widgetType, title, ...rest }, index) => (
          <div key={rest.i} data-grid={rest}>
            <GridTile
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              title={`Widget ${index}`}
              widgetType={widgetType}
              widgetConfig={rest}
              setWidgetAttribute={setWidgetAttribute}
              removeWidget={removeWidget}
            >
              {rest.i}
            </GridTile>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
