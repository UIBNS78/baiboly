import React, { Component } from "react";
import { MenuComponent } from "../components/common/menu/menu-component";
import RightComponent from "../components/home/right-content";
import SearchComponent from "../components/home/left-content/search-component";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <div className="menu-box">
          <MenuComponent />
        </div>
        <div className="title-box">
          <h2 className="title">X X X X X</h2>
        </div>
        <div className="content">
          <div className="w-70">
            <SearchComponent />
          </div>
          <div className="w-30">
            <RightComponent />
          </div>
        </div>
      </>
    );
  }
}
