import { useEffect, useState } from 'react'
import * as service from './services/observables'
import './App.css'
function App() {
  const [temp, setTemp] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [tempSub, setTempSub] = useState(null);
  const [pressureSub, setPressureSub] = useState(null);
  const [humiditySub, setHumiditySub] = useState(null);

  useEffect(() => {
    let tempSubscriber = service.observable.getTemperature().subscribe(data => setTemp(data))
    setTempSub(tempSubscriber)
    service.observable.emitTemp();
    let pressureSubscriber = service.observable.getPressure().subscribe(data => setPressure(data))
    setPressureSub(pressureSubscriber)
    service.observable.emitPressure();
    let humiditySubscriber = service.observable.getHumidity().subscribe(data => setHumidity(data))
    setHumiditySub(humiditySubscriber)
    service.observable.emitHumidity();
    return () => {
      tempSub.unsubscribe()
      pressureSub.unsubscribe()
      humiditySub.unsubscribe()
    }
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
