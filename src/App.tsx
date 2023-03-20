import MapTrackingComponent from "./components/MapTrackingComponent";

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Capacitor React App with Map Tracking</h1>
      </header>
      <div className="map-container" style={{ width: "100%", height: "80vh" }}>
        <MapTrackingComponent />
      </div>
    </div>
  );
}

export default App;
