import { PageSection } from '@patternfly/react-core';
import AddWidgetDrawer from '../components/DnDLayout/AddWidgetDrawer';
import GridLayout from '../components/DnDLayout/GridLayout';
import { useAtomValue } from 'jotai';
import { lockedLayoutAtom } from '../state/lockedLayoutAtom';
import LockedControls from '../components/DnDLayout/LockedControls';

const DefaultLocked = () => {
  const isLocked = useAtomValue(lockedLayoutAtom);
  return (
    <>
      <LockedControls />
      <AddWidgetDrawer>
        <PageSection>
          <GridLayout isLocked={isLocked} />
        </PageSection>
      </AddWidgetDrawer>
    </>
  );
};

export default DefaultLocked;
