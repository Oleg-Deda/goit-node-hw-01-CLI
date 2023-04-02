const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("db/contacts.json");

// Read all contacts
const readContacts = async () => {
  const data = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf-8"
  );
  const result = JSON.parse(data);
  return result;
};

// Get all contacts
async function listContacts() {
  return await readContacts();
}

// Get contact by id
async function getContactById(contactId) {
  const contacts = await readContacts();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact ? contact : null;
}

// Remove contact by id
async function removeContact(contactId) {
  const contacts = await readContacts();
  const contact = contacts.findIndex((contact) => contact.id === contactId);
  if (contact === -1) {
    return null;
  }
  const [deleteContacts] = contacts.splice(contact, 1);
  await fs.writeFile(
    path.join(__dirname, "db", "contact.json"),
    JSON.stringify(contacts, null, 2),
  )
  return deleteContacts;
}

// Add contact
async function addContact(name, email, phone) {
    const contact = await readContacts();
    const newContact = {
      id: nanoid(8),
      name,
      email,
      phone,
    };
    contact.push(newContact);
    await fs.writeFile(
      path.join(__dirname, "db", "contact.json"),
      JSON.stringify(contact, null, 2),
    );
    return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };