import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import ReactModal from "react-modal";

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

ReactModal.setAppElement('#root');
