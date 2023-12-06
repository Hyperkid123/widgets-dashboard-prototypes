import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownList,
  Icon,
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core';
import { EllipsisVIcon, GripVerticalIcon } from '@patternfly/react-icons';
import React, { Fragment, useMemo, useState } from 'react';

import './GridTile.css';
import { Layout } from 'react-grid-layout';
import { WidgetTypes } from '../Widgets/widgetTypes';
import widgetMapper from '../Widgets/widgetMapper';

export type ExtendedLayoutItem = Layout & {
  widgetType: WidgetTypes;
  title: string;
};

export type GridTileProps = React.PropsWithChildren<{
  id: string;
  widgetType: WidgetTypes;
  title: string;
}>;

const GridTile = ({ children, widgetType, title }: GridTileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Component = widgetMapper[widgetType] || Fragment;

  const dropdownItems = useMemo(() => {
    return (
      <>
        <DropdownItem>Action</DropdownItem>
      </>
    );
  }, []);

  const headerActions = (
    <>
      <Dropdown
        onSelect={console.log}
        toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
          <MenuToggle
            ref={toggleRef}
            isExpanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            variant="plain"
            aria-label="Card title inline with images and actions example kebab toggle"
          >
            <EllipsisVIcon aria-hidden="true" />
          </MenuToggle>
        )}
        isOpen={isOpen}
        onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
      >
        <DropdownList>{dropdownItems}</DropdownList>
      </Dropdown>
      <Icon className="drag-handle">
        <GripVerticalIcon style={{ fill: '#6a6e73' }} />
      </Icon>
    </>
  );
  return (
    <Card className="grid-tile">
      <CardHeader actions={{ actions: headerActions }}>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Component></Component>
      </CardBody>
    </Card>
  );
};

export default GridTile;
