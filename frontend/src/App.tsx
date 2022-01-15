import './App.css';
import { ThemeProvider } from '@material-ui/core';
import { mainTheme } from './configs/MuiConfig';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import LandingPage from './components/Shared/LandingPage';

const ViewProduct = lazy(() => import('./components/Product/ViewProduct'));
const CreateProduct = lazy(() => import('./components/Product/CreateProduct'));
const EditProduct = lazy(() => import('./components/Product/EditProduct'));
const PageNotFound = lazy(() => import('./components/Shared/PageNotFound'));
const ErrorPage = lazy(() => import('./components/Shared/ErrorPage'));

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
              <Route
                exact
                path="/product"
                render={() =>
                  <React.Fragment>
                    <CreateProduct edit="false" />
                  </React.Fragment>
                }
              />
              <Route
                exact
                path="/product/edit/:id"
                render={({ match }) => (
                    <React.Fragment>
                      <EditProduct id={match.params.id} />
                    </React.Fragment>
                  )
                }
              />
              <Route
                exact
                path="/error"
                render={() =>
                  <React.Fragment>
                    <ErrorPage />
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
