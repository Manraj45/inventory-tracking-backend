import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { mainTheme } from './configs/MuiConfig';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React, { lazy, Suspense, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import LandingPage from './components/Shared/LandingPage';

const ViewProduct = lazy(() => import('./components/Product/ViewProduct'));
const PageNotFound = lazy(() => import('./components/Shared/PageNotFound'));

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={mainTheme}>
        <div className="App">
          <Suspense fallback={<LandingPage />}>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  <React.Fragment>
                    <ViewProduct />
                  </React.Fragment>
                }
              />
              <Route path="*" render={() => <PageNotFound />} />
            </Switch>
          </Suspense>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
