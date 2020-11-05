import React from "react";

export default function SaveRecord({
  saveToLocalStorage,
  readFromLocalStorage,
  saveToFirebase,
  readFromFirebase,
  isAuth
}) {
  return isAuth ? (
    <div className="storageFunction">
      {/* <button
        className="btn btn-outline-success m-3 px-4"
        title="存入localstorage"
        onClick={saveToLocalStorage}
      >
        <i className="fas fa-save"></i>
      </button>
      <button
        className="btn btn-outline-success m-3 px-4"
        title="讀取localstorage"
        onClick={readFromLocalStorage}
      >
        <i className="far fa-folder-open"></i>
      </button> */}
      <button
        className="btn btn-outline-success m-3 px-4"
        title="存入firebase"
        onClick={saveToFirebase}
      >
        <i className="fas fa-save"></i> Save to firebase
      </button>
      <button
        className="btn btn-outline-success m-3 px-4"
        title="讀取firebase"
        onClick={readFromFirebase}
      >
        <i className="far fa-folder-open"></i> Read from firebase
      </button>
    </div>
  ) : null;
}
