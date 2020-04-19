import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

const generateTickets = (number) => {
  const carriers = ['S7', 'W6', 'SU', 'LH', 'BT', 'TK', 'DP'];
  const destinations = ['LED', 'OVB', 'DME', 'KGP', 'GRV', 'VKO', 'UUD', 'UFA'];
  let result = [];

  while(result.length < number) {
    const origin = destinations[Math.floor(Math.random() * destinations.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];

    result.push({
      price: Math.floor(Math.random() * 50000),
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      segments: [
        {
          origin: origin,
          destination: destination,
          date: '2020-05-01T10:00:00+0000',
          stops: ['VKO', 'SVO', 'DME', 'KGP'].splice(0, Math.floor(Math.random() * 4)),
          duration: Math.floor(Math.random() * 200),
        },
        {
          origin: destination,
          destination: origin,
          date: '2020-05-15T15:00:00+0000',
          stops: ['VKO', 'SVO', 'DME', 'KGP'].splice(0, Math.floor(Math.random() * 4)),
          duration: Math.floor(Math.random() * 200),
        },
      ]
    });
  }

  return result
};

const filterOptions = [
  {label: 'Без пересадок', value: '0',},
  {label: '1 пересадка', value: '1',},
  {label: '2 пересадки', value: '2',},
  {label: '3 пересадки', value: '3',},
];

ReactDOM.render(
  <React.StrictMode>
    <App tickets={generateTickets(10)} filterOptions={filterOptions}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
