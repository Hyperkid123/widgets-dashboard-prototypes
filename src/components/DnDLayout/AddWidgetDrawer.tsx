import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Icon,
  List,
  ListItem,
  Title,
  Tooltip,
} from '@patternfly/react-core';
import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import { drawerExpandedAtom } from '../../state/drawerExpandedAtom';
import { GripVerticalIcon } from '@patternfly/react-icons';
import LargeWidget from '../Widgets/LargeWidget';
import { WidgetTypes } from '../Widgets/widgetTypes';
import { currentDropInItemAtom } from '../../state/currentDropInItemAtom';
import MediumWidget from '../Widgets/MediumWidget';
import SmallWidget from '../Widgets/SmallWidget';

export type AddWidgetDrawerProps = React.PropsWithChildren<{
  dismissible?: boolean;
}>;

const WidgetWrapper = ({
  title,
  children,
  widgetType,
}: React.PropsWithChildren<{ title: string; widgetType: WidgetTypes }>) => {
  const setDropInItem = useSetAtom(currentDropInItemAtom);
  const headerActions = (
    <Tooltip content={<p>Move widget</p>}>
      <Icon>
        <GripVerticalIcon style={{ fill: '#6a6e73' }} />
      </Icon>
    </Tooltip>
  );
  return (
    <Card
      onDragStart={(e) => {
        e.dataTransfer.setData('text', widgetType);
        setDropInItem(widgetType);
      }}
      // eslint-disable-next-line react/no-unknown-property
      unselectable="on"
      draggable={true}
    >
      <CardHeader actions={{ actions: headerActions }}>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

const AddWidgetDrawer = ({
  children,
  dismissible: dismissible = true,
}: AddWidgetDrawerProps) => {
  const [isExpanded, setIsExpanded] = useAtom(drawerExpandedAtom);
  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead title="Add widgets">
        <Title headingLevel="h2" size="xl">
          Add widgets
        </Title>

        {dismissible ? (
          <DrawerActions>
            <DrawerCloseButton onClick={() => setIsExpanded(false)} />
          </DrawerActions>
        ) : null}
      </DrawerHead>
      <List isPlain>
        <ListItem>
          <WidgetWrapper
            widgetType={WidgetTypes.LargeWidget}
            title="Large widget"
          >
            <LargeWidget />
          </WidgetWrapper>
        </ListItem>
        <ListItem>
          <WidgetWrapper
            widgetType={WidgetTypes.MediumWidget}
            title="Medium widget"
          >
            <MediumWidget />
          </WidgetWrapper>
        </ListItem>
        <ListItem>
          <WidgetWrapper
            widgetType={WidgetTypes.SmallWidget}
            title="Small widget"
          >
            <SmallWidget />
          </WidgetWrapper>
        </ListItem>
      </List>
    </DrawerPanelContent>
  );
  return (
    <Drawer isExpanded={isExpanded}>
      <DrawerContent
        style={{ background: 'transparent' }}
        panelContent={panelContent}
      >
        <DrawerContentBody>{children}</DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AddWidgetDrawer;
