import { collection, getDoc, getDocs } from "firebase/firestore/lite";
import React from "react";
import { trackPromise } from "react-promise-tracker";
import { useDispatch } from "react-redux";
import { collections, severity } from "../../../common/constante";
import database from "../../../config/firebase.config";
import { handleSnackbar } from "../../../redux/reducers/index-reducer";
import { AiFillHeart } from "react-icons/ai";
import "../../../style/home/favorite-style.css";

function FavorisComponent() {
  const [favorites, setFavorites] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const favoriteCollection = collection(database, collections.FAVORITE);
    trackPromise(
      getDocs(favoriteCollection)
        .then((snapshot) => {
          const favs = [];
          snapshot.forEach((fav) => {
            let newFav = { ...fav.data(), id: fav.id };
            getDoc(newFav.bible)
              .then((b) => {
                newFav.bible = b.exists() ? b.data() : null;
                favs.push(newFav);
              })
              .finally(() => setFavorites(favs));
          });
        })
        .catch((reason) => {
          const snackbar = {
            open: true,
            message: reason.message,
            severity: severity.ERROR,
          };
          dispatch(handleSnackbar({ snackbar }));
        })
    );
  }, [dispatch]);

  return (
    <div>
      {favorites.map((fav, i) => (
        <div className="fav-list-item" key={i}>
          <div className="icon-fav-list">
            <AiFillHeart />
          </div>
          <div className="fav-list-content">
            <span className="fav-list-name">{`${fav.bible.name} ${fav.chapter} : ${fav.from} - ${fav.to}`}</span>
            <span className="fav-list-text">{fav.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavorisComponent;
