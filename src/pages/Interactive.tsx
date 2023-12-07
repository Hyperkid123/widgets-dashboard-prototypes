import { PageSection } from '@patternfly/react-core';
import AddWidgetDrawer from '../components/DnDLayout/AddWidgetDrawer';
import Controls from '../components/DnDLayout/Controls';
import GridLayout from '../components/DnDLayout/GridLayout';

const Interactive = () => {
  return (
    <>
      <Controls />
      <AddWidgetDrawer>
        <PageSection>
          <GridLayout />
        </PageSection>
      </AddWidgetDrawer>
    </>
  );
};

export default Interactive;
