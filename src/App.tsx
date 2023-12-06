import '@patternfly/patternfly/patternfly.min.css';
import '@patternfly/patternfly/patternfly-addons.css';
import { useMemo } from 'react';
import { Page, PageSection } from '@patternfly/react-core';
import PageHeader from './components/PageHeader';
import Controls from './components/DnDLayout/Controls';
import GridLayout from './components/DnDLayout/GridLayout';
import AddWidgetDrawer from './components/DnDLayout/AddWidgetDrawer';

function App() {
  const header = useMemo(() => <PageHeader />, []);

  return (
    <Page header={header}>
      <Controls />
      <AddWidgetDrawer>
        <PageSection>
          <GridLayout />
        </PageSection>
      </AddWidgetDrawer>
    </Page>
  );
}

export default App;
