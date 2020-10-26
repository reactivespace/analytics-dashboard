import { useEffect, useState } from 'react'
import * as service from './services/observables'
import './App.css'
function App() {
  const [temp, setTemp] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  useEffect(() => {
    service.observable.getTemperature().subscribe(data => setTemp(data))
    service.observable.emitTemp();
    service.observable.getPressure().subscribe(data => setPressure(data))
    service.observable.emitPressure();
    service.observable.getHumidity().subscribe(data => setHumidity(data))
    service.observable.emitHumidity();
  })
  return (
    temp && pressure && humidity &&
    <div className="App">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <h5 className="title">
              Temperature
          </h5>
            <div className="readings">
              <p>{typeof temp.degree === "string" ? temp.degree : temp.degree.toFixed(2)}</p><span>{temp.unit}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <h5 className="title">
              Air Pressure
          </h5>
            <div className="readings">
              <p>{typeof pressure.degree === "string" ? pressure.degree : pressure.degree.toFixed(2)}</p><span>{pressure.unit}</span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <h5 className="title">
              Humidity
          </h5>
            <div className="readings">
              <p>{typeof humidity.degree === "string" ? humidity.degree : humidity.degree.toFixed(2)}</p><span>{humidity.unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;