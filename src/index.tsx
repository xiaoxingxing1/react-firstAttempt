import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as FastClick from 'fastclick';
import { configure } from 'mobx';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.min.css';
import './index.scss';
import './app.config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

configure({ enforceActions: true});

const render = () => {
  ReactDOM.render(
      <App />,
    document.getElementById('root') as HTMLElement
  );
};

render();

FastClick['attach'](document.body);
registerServiceWorker();
