import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

import './GridLayout.css';
import GridTile, { ExtendedLayoutItem } from './GridTile';
import { useState } from 'react';
import { WidgetTypes } from '../Widgets/widgetTypes';
import {
  widgetDefaultHeight,
  widgetDefaultWidth,
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

function getWidgetDefaultSettings(id: string): [WidgetTypes, string] {
  const [widgetType, i] = id.split('#');
  // we will need some type guards here and schema validation to remove unknown widgets
  return [widgetType as WidgetTypes, i];
}

const GridLayout = () => {
  const [layout, setLayout] = useState<ExtendedLayoutItem[]>(
    initialLayout.map((item) => {
      const [widgetType, i] = getWidgetDefaultSettings(item.i);
      return {
        ...item,
        i,
        w: widgetDefaultWidth[widgetType],
        h: widgetDefaultHeight[widgetType],
        widgetType,
      };
    })
  );
  return (
    // relative position is required for the grid layout to properly calculate child translation while dragging is in progress
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
        onLayoutChange={(newLayout: ExtendedLayoutItem[]) => {
          console.log({ newLayout });
          setLayout(newLayout);
        }}
      >
        {layout.map(({ i, widgetType, title, ...rest }, index) => (
          <div key={i} data-grid={rest}>
            <GridTile title={`Widget ${index}`} id={i} widgetType={widgetType}>
              {i}
            </GridTile>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
