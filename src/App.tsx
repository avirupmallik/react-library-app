import React from "react";
import "./App.css";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";
import { Footer } from "./layout/HomePage/components/Footer";
import { HomePage } from "./layout/HomePage/HomePage";
import { SearchBooksPage } from "./layout/SearchBooksPage/SearchBooksPage";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";

import LoginWidget from "./Auth/LoginWidget";
import { oktaConfigs } from "./lib/oktaConfigs";
import { ReviewListPage } from "./layout/BookCheckoutPage/ReviewListPage/ReviewListPage";
import { ShelfPage } from "./layout/ShelfPage/ShelfPage";
import { MessagesPage } from "./layout/MessagesPage/MessagesPage";
import { ManageLibraryPage } from "./layout/ManageLibraryPage/ManageLibraryPage";

const oktaAuth = new OktaAuth(oktaConfigs);

export const App = () => {
  const customAuthHandler = () => {
    history.push("/login");
  };
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Switch>
            <Route path="/" exact>
              <Redirect to={"/home"} />
            </Route>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route path="/search">
              <SearchBooksPage />
            </Route>
            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route
              path="/login"
              render={() => <LoginWidget config={oktaConfigs} />}
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path="/shelf">
              {" "}
              <ShelfPage />{" "}
            </SecureRoute>
            <SecureRoute path="/messages">
              {" "}
              <MessagesPage />{" "}
            </SecureRoute>
            <SecureRoute path="/admin">
              {" "}
              <ManageLibraryPage />{" "}
            </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  );
};

export default App;
