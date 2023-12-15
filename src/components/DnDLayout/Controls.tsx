import {
  PageSection,
  PageSectionVariants,
  Level,
  LevelItem,
  Title,
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { PanelOpenIcon } from '@patternfly/react-icons';
import FakeTabs from '../FakeTabs';
import { useSetAtom } from 'jotai';
import { drawerExpandedAtom } from '../../state/drawerExpandedAtom';

const Controls = () => {
  const setDrawerExpanded = useSetAtom(drawerExpandedAtom);
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
                <ToolbarItem>
                  <Button
                    onClick={() => setDrawerExpanded((prev) => !prev)}
                    variant="secondary"
                    iconPosition="right"
                    icon={<PanelOpenIcon />}
                  >
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
