import { useState } from "react";
import { TabSwitch } from "./TabSwitch/TabSwitch";
import "./Tabs.css";
import type { Selector } from "react-redux";
import type { RootState } from "../../services/store";
import type { tables } from "../../types";
import { TabElement } from "./TabElement/TabElement";

type TabsPanelProps = {
  tabs: {
    getAction: any;
    addAction: any;
    deleteAction: any;
    filters: string[];
    tabName: string;
    selector: Selector<RootState, tables[]>;
  }[];
};

export const TabsPanel = ({ tabs }: TabsPanelProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <ul className="tabs__menu">
        {tabs.map((tab, index) => (
          <li key={index}>
            <TabSwitch
              className={index === currentTab ? 'tabs__switch tabs__switch-active' : 'tabs__switch'}
              onSwitch={() => setCurrentTab(index)}
              tabName={tab.tabName}
            />
          </li>
        ))}
      </ul>
      <ul>
        {tabs.map((tab, index) => (
          <TabElement
            key={index}
            getAction={tab.getAction}
            addAction={tab.addAction}
            deleteAction={tab.deleteAction}
            filters={tab.filters}
            formName={tab.tabName}
            selector={tab.selector}
            className={index === currentTab ? 'tabs__element--active' : 'tabs__element'}
          />
        ))}
      </ul>
    </>
  );
};
