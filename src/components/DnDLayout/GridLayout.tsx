import ReactGridLayout, { ReactGridLayoutProps } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';

import './GridLayout.css';
import GridTile, { ExtendedLayoutItem, SetWidgetAttribute } from './GridTile';
import { useMemo, useState } from 'react';
import { WidgetTypes } from '../Widgets/widgetTypes';
import {
  widgetDefaultHeight,
  widgetDefaultWidth,
  widgetMaxHeight,
  widgetMinHeight,
} from '../Widgets/widgetDefaults';
import { useAtom, useAtomValue } from 'jotai';
import { currentDropInItemAtom } from '../../state/currentDropInItemAtom';
import { layoutAtom } from '../../state/layoutAtom';

function isWidgetType(type: string): type is WidgetTypes {
  return Object.values(WidgetTypes).includes(type as WidgetTypes);
}

const GridLayout = ({ isLocked = false }: { isLocked?: boolean }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [layout, setLayout] = useAtom(layoutAtom);

  const currentDropInItem = useAtomValue(currentDropInItemAtom);
  const droppingItemTemplate: ReactGridLayoutProps['droppingItem'] =
    useMemo(() => {
      if (currentDropInItem) {
        return {
          i: '__dropping-elem__',
          w: widgetDefaultWidth[currentDropInItem],
          h: widgetDefaultHeight[currentDropInItem],
          widgetType: currentDropInItem,
          title: 'New title',
        };
      }
    }, [currentDropInItem]);

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
    // fix placement order
    if (isWidgetType(data)) {
      const newWidget = {
        ...layoutItem,
        // w: layoutItem.x + layoutItem.w > 3 ? 1 : 3,
        // x: 4 % layoutItem.w,
        // x: layoutItem.x + layoutItem.w > 3 ? 3 : 0,
        h: widgetDefaultHeight[data],
        maxH: widgetMaxHeight[data],
        minH: widgetMinHeight[data],
        widgetType: data,
        i: `${data}#${Date.now() + Math.random()}`,
        title: 'New title',
      };
      setLayout((prev) =>
        prev.reduce<ExtendedLayoutItem[]>(
          (acc, curr) => {
            if (
              curr.x + curr.w > newWidget.x &&
              curr.y + curr.h <= newWidget.y
            ) {
              acc.push(curr);
            } else {
              // Wee need to push the current items down on the Y axis if they are supposed to be below the new widget
              acc.push({ ...curr, y: curr.y + curr.h });
            }

            return acc;
          },
          [newWidget]
        )
      );
    }
    event.preventDefault();
  };

  const activeLayout = useMemo(
    () =>
      layout.map((item) => ({
        ...item,
        locked: isLocked,
      })),
    [isLocked, layout]
  );

  return (
    // {/* relative position is required for the grid layout to properly calculate
    // child translation while dragging is in progress */}
    <div style={{ position: 'relative' }}>
      <ReactGridLayout
        className="layout"
        draggableHandle=".drag-handle"
        layout={activeLayout}
        // autoSize={isLocked}
        cols={4}
        rowHeight={88}
        width={1200}
        isDraggable={!isLocked}
        isResizable={!isLocked}
        resizeHandles={['se']}
        // add droppping item default based on dragged template
        droppingItem={droppingItemTemplate}
        isDroppable={!isLocked}
        onDrop={onDrop}
        useCSSTransforms
        verticalCompact
        onLayoutChange={(newLayout: ExtendedLayoutItem[]) => {
          if (isLocked) {
            return;
          }
          setLayout(newLayout.filter(({ i }) => i !== '__dropping-elem__'));
        }}
      >
        {activeLayout.map(({ widgetType, title, ...rest }) => (
          <div key={rest.i} data-grid={rest}>
            <GridTile
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              title={rest.i}
              widgetType={widgetType}
              // these will be dynamically calculated once the dimensions are calculated
              widgetConfig={{ ...rest, colWidth: 1200 / 4 }}
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
