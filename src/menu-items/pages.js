// assets
import { IconKey } from '@tabler/icons-react';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',

  type: 'group',
  children: [
    {
      id: 'pilgrim',
      title: 'PilgrimManagement',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'Pilgrim List',
          title: 'PilgrimList',
          type: 'item',
          url: '/sample-page',
          // target: true
        },
    
           {
          id: ' Enrollment Form',
          title: ' EnrollmentForm',
          type: 'item',
          url: '/hajj-enrolment',
      
        },
            {
          id: 'Grantor and Medical Form',
          title: 'Grantor and Medical Form',
          type: 'item',
          url: 'grantor-form',
          // target: true
        },
      ]
    },
        {
      id: 'finance',
      title: 'Financial Management',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Transactions',
          type: 'item',
          url: '/financial-mgt',
          // target: true
        },
        {
          id: 'register3',
          title: 'Savings Calculator',
          type: 'item',
          url: '/savings-calculator',
          // target: true
        },
        {
          id: 'register3',
          title: 'Reports',
          type: 'item',
          url: '/reports',
          // target: true
        }
      ]
    },
        {
      id: 'authentication',
      title: 'Admin Panel',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: ' Roles Permission',
          type: 'item',
          url: '/roles',
          // target: true
        },
        {
          id: 'register3',
          title: 'Settings',
          type: 'item',
          url: '/settings',
         
        }
      ]
    }
  ]
};

export default pages;