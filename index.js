const express = require('express');

const app = express();

app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Artos Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendick", 
      "number": "39-23-6423122"
    }
]

const noteDate = new Date();

const newId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1 
  }

app.get('/', (request, response) => {
    response.send('welcome world!');
  })

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/info', (request, response) => {
  const personsLength = Object.keys(persons).length;
  response.send(`phonebook has info of ${personsLength} peoples <br>  ${noteDate}`);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  console.log('person', person);
  if(person){
    response.json(person);
  }else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.filter(person => person.id !== id);
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;

    const content = ({
      name:body.name,
      number: body.number
    })

    const findRepeatedName = persons.find(person => body.name === person.name);

    if(!content ){
      return response.status(400).json({ 
        error: 'content missing' 
    });}
    if(findRepeatedName){
      response.send('the name already exists in the phonebook');
    }

    const person = {
      content: content,
      id: newId
    }
    
    response.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log('server running on PORT', PORT);
})