import { motion } from "framer-motion";
import React from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@mui/material";
import "../../../style/home/history-style.css";

function HistoryComponenet() {
  const [hasMoreHistory, setHasMoreHistory] = React.useState(true);
  const [history, setHistory] = React.useState([]);
  const handleShow = (id) => {
    const newHistory = history.map((h) => {
      if (h.id === id) {
        return { ...h, isOpen: !h.isOpen };
      }
      return h;
    });
    setHistory(newHistory);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setHistory([
        {
          id: 1,
          name: "Jaona",
          in: 2,
          from: 12,
          to: 20,
          content:
            "yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou yo oy yo ooyouoouo ou ",
          isOpen: false,
        },
        {
          id: 2,
          name: "Salamo",
          in: 15,
          from: 9,
          to: 11,
          content: "mlq sk djf qslm kfdj sq ldf jlqs",
          isOpen: false,
        },
        {
          id: 3,
          name: "Jaona",
          in: 15,
          from: 9,
          to: 11,
          content: "mlq sk djf qslm kfdj sq ldf jlqs",
          isOpen: false,
        },
        {
          id: 4,
          name: "Salamo",
          in: 15,
          from: 9,
          to: 11,
          content: "mlq sk djf qslm kfdj sq ldf jlqs",
          isOpen: false,
        },
        {
          id: 5,
          name: "Jaona",
          in: 15,
          from: 9,
          to: 11,
          content: "mlq sk djf qslm kfdj sq ldf jlqs",
          isOpen: false,
        },
      ]);
    }, 2000);
  }, []);

  const fetchMoreHistory = () => {
    if (history.length <= 15) {
      setTimeout(() => {
        setHistory([
          ...history,
          {
            id: Math.random(),
            name: "Petera",
            in: 3,
            from: 5,
            to: 6,
            content: "yo oy yo ooyouoouo ou ",
            isOpen: false,
          },
        ]);
      }, 2000);
    } else {
      setHasMoreHistory(false);
    }
  };

  const ItemSkeleton = () => {
    return Array.from({ length: 5 }).map((s, i) => (
      <div key={i} className="skeleton-box">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="skeleton-text-box">
          <Skeleton width={50} height={15} />
          <Skeleton width={"100%"} height={15} />
        </div>
      </div>
    ));
  };

  return (
    <div id="history">
      <InfiniteScroll
        dataLength={history.length}
        next={fetchMoreHistory}
        hasMore={hasMoreHistory}
        loader={<ItemSkeleton />}
        scrollableTarget="history"
      >
        <ul className="history-box">
          {history.length > 1 ? (
            history.map((h) => (
              <li key={h.id}>
                <motion.div
                  layout
                  data-isopen={h.isOpen}
                  initial={{ borderRadius: 10, opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="history-item"
                  onClick={() => handleShow(h.id)}
                >
                  <div className="icon-box">
                    <CiTextAlignLeft />
                  </div>
                  <div>
                    <div>
                      <span>{h.name + " " + h.in + " : "}</span>
                      <span>{h.from + " - " + h.to}</span>
                    </div>
                    <div>
                      <small className="content">{h.content}</small>
                    </div>
                  </div>
                </motion.div>
              </li>
            ))
          ) : (
            <ItemSkeleton />
          )}
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default HistoryComponenet;
