import { motion } from "framer-motion";
import React from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@mui/material";
import "../../../style/home/history-style.css";
import LoadingHistoryComponent from "../../common/loading/loadingHistory-component";
import { area, collections, severity } from "../../../common/constante";
import database from "../../../config/firebase.config";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { collection, getDoc, getDocs } from "firebase/firestore/lite";
import { useDispatch } from "react-redux";
import { handleSnackbar } from "../../../redux/reducers/index-reducer";

function HistoryComponenet() {
  const dispatch = useDispatch();

  const [hasMoreHistory, setHasMoreHistory] = React.useState(true);
  const [history, setHistory] = React.useState([]);

  const { promiseInProgress } = usePromiseTracker({ area: area.history });

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
    getHistory();
  }, []);

  const getHistory = () => {
    const historyCollection = collection(database, collections.HISTORY);
    trackPromise(
      getDocs(historyCollection)
        .then((snapshot) => {
          const h = [];
          snapshot.forEach((hist) => {
            let newHist = { ...hist.data(), id: hist.id };
            getDoc(newHist.bible)
              .then((b) => {
                newHist.bible = b.exists() ? b.data() : null;
                h.push(newHist);
              })
              .finally(() => setHistory(h));
          });
        })
        .catch((reason) => {
          const snackbar = {
            open: true,
            message: reason.message,
            severity: severity.ERROR,
          };
          dispatch(handleSnackbar({ snackbar }));
        }),
      area.history
    );
  };

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div id="history">
      <InfiniteScroll
        dataLength={history.length}
        hasMore={hasMoreHistory}
        scrollableTarget="history"
      >
        <ul className="history-box">
          {!promiseInProgress &&
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
                      <span>{h.bible.name + " " + h.chapter + " : "}</span>
                      <span>{h.from + " - " + h.to}</span>
                    </div>
                    <div>
                      <small className="content">
                        {capitalizeFirstLetter(h.verse)}
                      </small>
                    </div>
                  </div>
                </motion.div>
              </li>
            ))}
          <LoadingHistoryComponent area={area.history} />
        </ul>
      </InfiniteScroll>
    </div>
  );
}

export default HistoryComponenet;
