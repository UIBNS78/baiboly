import { motion } from "framer-motion";
import React from "react";
import { CiTextAlignLeft } from "react-icons/ci";
import InfiniteScroll from "react-infinite-scroll-component";
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

  const [hasMoreHistory] = React.useState(true);
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
  }, [dispatch]);

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
