import createBrowserHistory from 'history/createBrowserHistory';
const basename = '/operation-web/topo';

let history = null;
  history = createBrowserHistory({
      basename
  });
export default history;

