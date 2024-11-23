import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import GrantorForm from 'views/sample-page/GrantorForm';
import { element } from 'prop-types';
import FinancialManagementPage from 'views/sample-page/FinancialMgt';
import SavingsCalculatorPage from 'views/sample-page/SavingsCalculator';
import ReportPage from 'views/sample-page/Report';
import RolesAndPermissionsPage from 'views/sample-page/Roles';
import SettingsPage from 'views/sample-page/Setting';
// import EnrolmentForm from 'views/sample-page/Enrolment';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/Color')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const EnrolmentForm = Loadable(lazy(() => import('views/sample-page/Enrolment')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'sample-page',
      element: <EnrolmentForm />
    },
    {
      path: 'hajj-enrolment',
      element: <SamplePage />
    },
    {
      path: 'grantor-form',
      element: <GrantorForm />
    },
    {
      path: 'financial-mgt',
      element: <FinancialManagementPage />
    },
    {
      path: 'savings-calculator',
      element: <SavingsCalculatorPage />
    },
    {
      path: 'reports',
      element: <ReportPage />
    },
    {
      path: 'roles',
      element: <RolesAndPermissionsPage />
    },
    {
      path: 'settings',
      element: <SettingsPage />
    }
  ]
};

export default MainRoutes;
