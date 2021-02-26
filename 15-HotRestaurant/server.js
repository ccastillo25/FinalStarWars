const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = [
  {
    routeName: 'Charlie',
    name: 'Charlie',
    partySize: '8',
    phoneNumber: '100-200-3000'
  },
  {
    routeName: 'Andy',
    name: 'Andy',
    partySize: '4',
    phoneNumber: '400-500-6000'
  },
];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'add.html')));

app.get('/api/reservations', (req, res) => res.json(reservations));

app.get('/api/reservations/:reservations', (req, res) => {
  const chosen = req.params.reservations;

  console.log(chosen);

  for (let i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

app.post('/api/reservations', (req, res) => {
  const newReservations = req.body;

  newReservations.routeName = newReservations.name.replace(/\s+/g, '').toLowerCase();
  console.log(newReservations);

  reservations.push(newReservations);
  res.json(newReservations);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
