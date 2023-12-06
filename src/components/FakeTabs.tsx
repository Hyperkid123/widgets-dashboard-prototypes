import { Tab, TabTitleIcon, TabTitleText, Tabs } from '@patternfly/react-core';
import { HomeIcon } from '@patternfly/react-icons';

const FakeTabs = () => {
  return (
    <Tabs activeKey={0}>
      <Tab
        eventKey={0}
        title={
          <TabTitleText>
            <TabTitleIcon>
              <HomeIcon />
            </TabTitleIcon>
            <span className="pf-v5-u-pl-sm">My dashboard</span>
          </TabTitleText>
        }
      />
      <Tab eventKey={1} title="All services" />
      <Tab eventKey={1} title="Settings" />
      <Tab eventKey={1} title="Subscriptions" />
      <Tab eventKey={1} title="Manage profile" />
    </Tabs>
  );
};

export default FakeTabs;
