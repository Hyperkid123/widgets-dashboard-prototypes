import {
  Icon,
  PageSection,
  PageSectionVariants,
  Level,
  LevelItem,
  Title,
  Dropdown,
  DropdownItem,
  MenuToggleElement,
  MenuToggle,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { AddCircleOIcon, LockOpenIcon } from '@patternfly/react-icons';
import React, { useState } from 'react';
import FakeTabs from '../FakeTabs';

const DEFAULT_TEXT = 'Config view: devel…deafult';

const Controls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined
  ) => {
    // eslint-disable-next-line no-console
    console.log('selected', value);
    setIsOpen(false);
  };
  return (
    <PageSection className="pf-v5-u-pb-0" variant={PageSectionVariants.light}>
      <Level>
        <LevelItem>
          <Title headingLevel="h1" size="2xl">
            Hi, Ned Username
          </Title>
          <Title headingLevel="h2" size="2xl">
            Welcome to your Hybrid Cloud Console.
          </Title>
        </LevelItem>
        <LevelItem>
          <Toolbar>
            <ToolbarContent>
              <ToolbarGroup>
                <ToolbarItem
                  style={{
                    height: 36,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                  }}
                >
                  <Icon color="gray">
                    <LockOpenIcon />
                  </Icon>
                </ToolbarItem>
                <ToolbarItem>
                  <Dropdown
                    onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
                    onSelect={onSelect}
                    isOpen={isOpen}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={() => setIsOpen((prev) => !prev)}
                        isExpanded={isOpen}
                      >
                        {DEFAULT_TEXT}
                      </MenuToggle>
                    )}
                  >
                    <DropdownItem>{DEFAULT_TEXT}</DropdownItem>
                  </Dropdown>
                </ToolbarItem>
                <ToolbarItem>
                  <Button variant="secondary" icon={<AddCircleOIcon />}>
                    Add widgets
                  </Button>
                </ToolbarItem>
              </ToolbarGroup>
            </ToolbarContent>
          </Toolbar>
        </LevelItem>
      </Level>
      <FakeTabs />
    </PageSection>
  );
};

export default Controls;
