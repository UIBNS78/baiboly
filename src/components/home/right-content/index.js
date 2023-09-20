import { AnimatePresence, motion } from "framer-motion";
import React, { Component } from "react";
import FavorisComponent from "./favoris-component";
import HistoryComponenet from "./history-component";
import { CiHeart, CiTimer } from "react-icons/ci";
import "../../../style/home/home-style.css";

export class RightComponent extends Component {
  tabs = [
    { ref: "history", label: "History", icon: <CiTimer /> },
    { ref: "favoris", label: "Favoris", icon: <CiHeart /> },
  ];
  state = {
    selectedTab: this.tabs[0],
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <div className="right-box">
        <div>
          <ul className="tabs-box">
            {this.tabs.map((t) => (
              <li
                key={t.ref}
                className={"tab-item " + (selectedTab === t ? "selected" : "")}
                onClick={() => this.setState({ selectedTab: t })}
              >
                <div className="tab-item-name">
                  <div className="tab-icon-name">{t.icon}</div>
                  <span>{t.label}</span>
                </div>
                {selectedTab === t ? (
                  <motion.div className="underline" layoutId="underline" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.ref : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {(() => {
                switch (selectedTab) {
                  case this.tabs[0]:
                    return <HistoryComponenet />;
                  case this.tabs[1]:
                    return <FavorisComponent />;
                  default:
                    return null;
                }
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }
}

export default RightComponent;
