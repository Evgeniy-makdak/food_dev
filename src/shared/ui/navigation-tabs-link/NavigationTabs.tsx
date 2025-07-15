import React from 'react';
import './NavigationTabs.scss';
import { NavigationTabsProps } from '../../types/types';

// interface NavigationTabsProps {
//   items: any[];
//   activeTab: string;
//   setActiveTab: (id: string) => void;
// }

const NavigationTabs: React.FC<NavigationTabsProps> = ({ items, activeTab, setActiveTab }) => {
  return (
    <nav className="navigations">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => setActiveTab(item.id)}
          className={`navigation-tab ${activeTab === item.id ? "active" : ""}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default NavigationTabs;