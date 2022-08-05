const express = require('express');

const app = express();

let persons = [
    { 
      "id": 1,
      "name": "Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('welcome world!');
  })

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log('server running on PORT', PORT);
})