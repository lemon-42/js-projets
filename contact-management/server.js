const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const contactsFile = 'contact.json';

let contactIdCounter = 1;

app.use(express.json());

// get all contacts
app.get('/contacts', (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

// get one contact
app.get('/contacts/:id', (req, res) => {
    const allContacts = JSON.parse(fs.readFileSync(contactsFile));
    const findContact = allContacts.find(c => c.id === parseInt(req.params.id));
    if (findContact) {
      res.json(findContact);
    } else {
      res.status(404).send('Contact not found');
    }
});

// add a contact
app.post('/contacts', (req, res) => {
  const newContact = { id: contactIdCounter++, ...req.body };
  const contacts = readContacts();
  contacts.push(newContact);
  writeContacts(contacts);
  res.json(newContact);
});

// update a contact
app.put('/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));  
  if (index === -1) {
    res.status(404).send('Contact not found');
  } else {
    contacts[index] = { ...contacts[index], ...req.body };
    writeContacts(contacts);
    res.json(contacts[index]);
  }
});

// delete a contact
app.delete('/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).send('Contact not found');
  } else {
    const deleted = contacts.splice(index, 1)[0];
    writeContacts(contacts);
    res.json(deleted);
  }
});

function readContacts() {
  try {
    const contacts = JSON.parse(fs.readFileSync(contactsFile));
    return contacts;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function writeContacts(contacts) {
  try {
    fs.writeFileSync(contactsFile, JSON.stringify(contacts));
  } catch (err) {
    console.error(err);
  }
}

app.listen(port, () => {
  console.log(`Server started on : http://localhost:${port}`);
});
