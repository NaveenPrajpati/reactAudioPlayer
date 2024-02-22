export const loadPlaylistFromIndexedDB = (setPlaylist) => {
  const request = indexedDB.open("playlistDb", 1);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.errorCode);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["playlist"], "readonly");
    const objectStore = transaction.objectStore("playlist");
    const getPlaylistRequest = objectStore.getAll();

    getPlaylistRequest.onsuccess = function (event) {
      setPlaylist(event.target.result);
    };
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("playlist", {
      keyPath: "id",
      autoIncrement: true,
    });
  };
};

export const savePlaylistToIndexedDB = (newPlaylist) => {
  const request = indexedDB.open("playlistDb", 1);

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.errorCode);
  };

  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["playlist"], "readwrite");
    const objectStore = transaction.objectStore("playlist");

    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = () => {
      console.log("IndexedDB cleared successfully");
    };

    request.onsuccess = () => {
      console.log("Data deleted successfully");
    };
    newPlaylist.forEach((track) => {
      objectStore.add(track);
    });
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("playlist", {
      keyPath: "id",
      autoIncrement: true,
    });
  };
};
