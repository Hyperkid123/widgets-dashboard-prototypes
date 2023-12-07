import {
  Bullseye,
  Button,
  Icon,
  PageSection,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Title,
} from '@patternfly/react-core';
import { HandPointerIcon, OutlinedEditIcon } from '@patternfly/react-icons';
import React from 'react';
import { Link } from 'react-router-dom';

const RouteLink = ({
  to,
  children,
  icon,
}: React.PropsWithChildren<{ to: string; icon: React.ReactNode }>) => {
  return (
    <Link to={to}>
      <Stack hasGutter>
        <StackItem>
          <Button
            style={{
              display: 'block',
              margin: 'auto',
            }}
            variant="plain"
            icon={<Icon size="xl">{icon}</Icon>}
          ></Button>
        </StackItem>
        <StackItem>
          <Title
            style={{
              textAlign: 'center',
            }}
            headingLevel="h3"
          >
            {children}
          </Title>
        </StackItem>
      </Stack>
    </Link>
  );
};

const Root = () => {
  return (
    <PageSection>
      <Bullseye>
        <Split hasGutter>
          <SplitItem>
            <RouteLink to="/interactive" icon={<HandPointerIcon />}>
              Unlocked by default
            </RouteLink>
          </SplitItem>
          <SplitItem>
            <RouteLink to="/locked" icon={<OutlinedEditIcon />}>
              With edit mode
            </RouteLink>
          </SplitItem>
        </Split>
      </Bullseye>
    </PageSection>
  );
};

export default Root;
