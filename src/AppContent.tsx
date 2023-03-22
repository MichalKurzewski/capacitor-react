import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import { mapOutline, homeOutline, gameControllerOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import React, { Suspense } from "react";
import Page from "./components/pages/Page";
import LoadingLottie from "./components/molecules/LoadingLottie";

const AppContent: React.FC = (): JSX.Element => {
  const HomePage = React.lazy(() => import("./components/pages/HomePage"));
  const MapPage = React.lazy(() => import("./components/pages/MapPage"));
  const GamePage = React.lazy(() => import("./components/pages/GamePage"));

  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route
            path="/home"
            render={() => (
              <SuspendedRoute>
                <HomePage />
              </SuspendedRoute>
            )}
            exact={true}
          />
          <Route
            path="/map"
            render={() => (
              <SuspendedRoute>
                <MapPage />
              </SuspendedRoute>
            )}
            exact={true}
          />
          <Route
            path="/game"
            render={() => (
              <SuspendedRoute>
                <GamePage />
              </SuspendedRoute>
            )}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href="/map">
            <IonIcon icon={mapOutline} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>

          <IonTabButton tab="game" href="/game">
            <IonIcon icon={gameControllerOutline} />
            <IonLabel>Charades</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default AppContent;

interface IItemProps {
  children?: string | JSX.Element | JSX.Element[];
}
export const SuspendedRoute: React.FC<IItemProps> = (
  props: IItemProps
): JSX.Element => {
  return (
    <Suspense
      fallback={
        <Page title="Loading">
          <div className="flex items-center justify-center h-full">
            <LoadingLottie />
          </div>
        </Page>
      }
    >
      {props.children}
    </Suspense>
  );
};
