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

function getWidgetDefaultSettings(id: string): [WidgetTypes, string] {
  const [widgetType, i] = id.split('#');
  // we will need some type guards here and schema validation to remove unknown widgets
  return [widgetType as WidgetTypes, i];
}

const GridLayout = () => {
  const [layout, setLayout] = useState<ExtendedLayoutItem[]>(
    [
      { i: 'LargeWidget#1', x: 0, y: 0 },
      { i: 'LargeWidget#2', x: 0, y: 1 },
      { i: 'LargeWidget#3', x: 0, y: 2 },
    ].map((item) => {
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
        onLayoutChange={(newLayout: ExtendedLayoutItem[]) =>
          setLayout(newLayout)
        }
      >
        {layout.map(({ i, widgetType, ...rest }) => (
          <div key={i} data-grid={rest}>
            <GridTile id={i} widgetType={widgetType}>
              {i}
            </GridTile>
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export default GridLayout;
