import { useState } from 'react';
import './App.css';
import Forecast from './Forecast';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [selectedLocationWeather, setSelectedLocationWeather] = useState(undefined);
  const [locations, setLocations] = useState([
    {
      name: 'Tallinn, Eesti',
      latitude: '59.427515',
      longitude: '24.725868'
    },
    {
      name: 'Nuuk, Gröönimaa',
      latitude: '64.18347',
      longitude: '-51.72157'
    }
    ,
    {
      name: 'Gua, India',
      latitude: '22.21376',
      longitude: '85.38780'
    }
  ]);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    getLocationsData(location);
  }

  const getLocationsData = async (locations) => {
    setIsLoading(true);
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${locations.latitude}&longitude=${locations.longitude}&current=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max`);
    const dataJson = await data.json();
    setIsLoading(false);
    //console.log(dataJson);
    setSelectedLocationWeather(dataJson);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h4>Asukohad</h4>
          {locations.map((locations) => (
            <div key={locations.name}>
              <a onClick={() => selectLocation(locations)}>{locations.name}</a>
            </div>
          ))}
        </div>
        <div>
          {selectedLocation ? (
            <>
              <h4>Ilmateade</h4>
              <div>
                {selectedLocation.name}
              </div>
              {isLoading ? 'Laen andmeid' : (
                <div>Asukohas {selectedLocation.name} on {selectedLocationWeather.current.temperature_2m} {selectedLocationWeather.current_units.temperature_2m}.
                  <Forecast dailyData={selectedLocationWeather.daily} dailyUnits={selectedLocationWeather.daily_units} />
                </div>
              )}
            </>) : (<><h4>Ilmateate kuvamiseks vali asukoht!</h4></>)}
        </div>
      </header>
    </div>
  );
}

export default App;
