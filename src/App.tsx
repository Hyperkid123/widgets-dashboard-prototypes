import '@patternfly/patternfly/patternfly.min.css';
import '@patternfly/patternfly/patternfly-addons.css';
import { useMemo } from 'react';
import { Page } from '@patternfly/react-core';
import PageHeader from './components/PageHeader';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Interactive from './pages/Interactive';
import Root from './pages/Root';
import DefaultLocked from './pages/DefaultLocked';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/interactive',
    element: <Interactive />,
  },
  {
    path: '/locked',
    element: <DefaultLocked />,
  },
]);

function App() {
  const header = useMemo(() => <PageHeader />, []);

  return (
    <Page header={header}>
      <RouterProvider router={router} />
    </Page>
  );
}

export default App;
