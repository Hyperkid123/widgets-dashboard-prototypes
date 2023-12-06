import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-addons.css';
import { useMemo } from 'react';
import { Page } from '@patternfly/react-core';
import PageHeader from './components/PageHeader';
import Controls from './components/DnDLayout/Controls';

function App() {
  const header = useMemo(() => <PageHeader />, []);

  return (
    <Page header={header}>
      <Controls />
    </Page>
  );
}

export default App;
