import React from "react";
import "./TabsPanel.scss";


interface Tab {
  id: string;
  tabTitle: string;
  tabContent: React.FC;
}
interface Props {
  tabList: Tab[];
}
const TabsPanel: React.FC<Props> = ({ tabList }) => {

  const [visibleTab, setVisibleTab] = React.useState(tabList[0].id);

  const listTitles = tabList.map((item) => (
    <li
      key={item.id}
      onClick={() => setVisibleTab(item.id)}
      className={
        visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"
      }
    >
      {item.tabTitle}
    </li>
  ));

  const listContent = tabList.map((tab) => (
    <div key={tab.id} style={visibleTab === tab.id ? {} : { display: "none" }}>
      {<tab.tabContent  />}
    </div>
  ));

  return (
    <div id="TabsPanel">
      <ul className="tabs-titles">{listTitles}</ul>
      <div className="tab-content">{listContent}</div>
    </div>
  );
};

export default TabsPanel;
