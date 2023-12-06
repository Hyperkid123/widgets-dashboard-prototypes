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
import { useAtom } from 'jotai';
import React from 'react';
import { drawerExpandedAtom } from '../../state/drawerExpandedAtom';
import { GripVerticalIcon } from '@patternfly/react-icons';
import LargeWidget from '../Widgets/LargeWidget';
import { WidgetTypes } from '../Widgets/widgetTypes';

export type AddWidgetDrawerProps = React.PropsWithChildren<{}>;

const WidgetWrapper = ({
  title,
  children,
  widgetType,
}: React.PropsWithChildren<{ title: string; widgetType: WidgetTypes }>) => {
  const headerActions = (
    <Tooltip content={<p>Move widget</p>}>
      <Icon>
        <GripVerticalIcon style={{ fill: '#6a6e73' }} />
      </Icon>
    </Tooltip>
  );
  return (
    <Card
      onDragStart={(e) => e.dataTransfer.setData('text', widgetType)}
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

const AddWidgetDrawer = ({ children }: AddWidgetDrawerProps) => {
  const [isExpanded, setIsExpanded] = useAtom(drawerExpandedAtom);
  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead title="Add widgets">
        <Title headingLevel="h2" size="xl">
          Add widgets
        </Title>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setIsExpanded(false)} />
        </DrawerActions>
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
