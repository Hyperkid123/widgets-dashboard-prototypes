import '@patternfly/patternfly/patternfly.min.css';
import '@patternfly/patternfly/patternfly-addons.css';
import { useMemo } from 'react';
import { Page, PageSection } from '@patternfly/react-core';
import PageHeader from './components/PageHeader';
import Controls from './components/DnDLayout/Controls';
import GridLayout from './components/DnDLayout/GridLayout';

function App() {
  const header = useMemo(() => <PageHeader />, []);

  return (
    <Page header={header}>
      <Controls />
      <PageSection>
        <GridLayout />
      </PageSection>
    </Page>
  );
}

export default App;
