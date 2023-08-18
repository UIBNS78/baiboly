import * as React from "react";
import { motion } from "framer-motion";
import { MenuItemComponent } from "./menuItem-component";
import { CiSearch, CiHeart, CiTimer, CiSettings } from "react-icons/ci";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemTop = [
  {
    label: "Search verse",
    route: "",
    icon: <CiSearch style={{ fontSize: "30px" }} />,
  },
  {
    label: "History",
    route: "",
    icon: <CiTimer style={{ fontSize: "30px" }} />,
  },
  {
    label: "Favoris",
    route: "",
    icon: <CiHeart style={{ fontSize: "30px" }} />,
  },
  {
    label: "Setting",
    route: "",
    icon: <CiSettings style={{ fontSize: "30px" }} />,
  },
];

const itemBottom = [
  {
    label: "Setting",
    route: "",
    icon: <CiSettings style={{ fontSize: "30px" }} />,
  },
];

export const NavigationComponent = () => (
  <>
    <motion.ul variants={variants} className="menu-item-box top">
      {itemTop.map((item, i) => (
        <MenuItemComponent key={i} item={item} />
      ))}
    </motion.ul>
    {/* <motion.ul variants={variants} className="menu-item-box bottom">
      {itemBottom.map((item, i) => (
        <MenuItemComponent key={i} item={item} />
      ))}
    </motion.ul> */}
  </>
);
