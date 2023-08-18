import * as React from "react";
import { motion } from "framer-motion";
import "../../../style/menu-style.css";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItemComponent = ({ item }) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      className="menu-item"
    >
      {item.icon}
      <div>{item.label}</div>
    </motion.li>
  );
};
