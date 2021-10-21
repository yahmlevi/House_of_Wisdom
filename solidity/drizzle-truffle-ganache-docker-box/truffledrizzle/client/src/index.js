import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css'

import './index.css';
// import App from './components/App';
import DappFarmApp from './components/DappFarmApp';
import * as serviceWorker from './serviceWorker';

// import {Drizzle} from "drizzle";
import { Drizzle } from "@drizzle/store";

import MyStringStore from "./contracts/MyStringStore.json";
import TokenFarm from "./contracts/TokenFarm.json"; 
import DaiToken from "./contracts/DaiToken.json";
import DappToken from "./contracts/DappToken.json";
// import MetaCoin from "./contracts/MetaCoin.json";

// setup drizzle
const options = {
    contracts: [ 
        MyStringStore,
        TokenFarm,
        DaiToken,
        DappToken
        // MetaCoin
    ],
    web3: {
        fallback: {
            type: "ws",
            // url: "ws://127.0.0.1:9545",
            // url: "ws://127.0.0.1:8545",
            url: "ws://localhost:8545",
            // url: "ws://ganache-cli:8545",
            
        },
    },
};
const drizzle = new Drizzle(options);

// ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
// ReactDOM.render(<DappFarmApp />, document.getElementById('root'));
ReactDOM.render(<DappFarmApp drizzle={drizzle} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
