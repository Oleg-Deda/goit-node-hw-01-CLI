const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve("db/contacts.json");

// Зчитуємо усі контакти
const readContacts = async () => {
  try {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
} catch (err) {
  console.error(err);
}
};

// Оновлюємо контакти
const updateContacts = (contacts) => {
	return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
};

// Отримуємо усі контакти
 function listContacts() {
  return  readContacts();
}

// Отримуємо контакт за ІД
async function getContactById(contactId) {
  try {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
} catch (err) {
  console.error(err);
}
}

// Видаляємо контакт по ІД
async function removeContact(contactId) {
  try {
  const contacts = await readContacts();
  const contact = await contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  const newContacts = await contacts.filter((contact) => contact.id !== contactId);
		await updateContacts(newContacts);
  return "removed contact";
} catch (err) {
  console.error(err);
}
}

// Добавляємо контакт
async function addContact(name, email, phone) {
  try {
  const contacts = await readContacts();
  const newContact = { name, email, phone, id: nanoid(8) };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
} catch (err) {
  console.error(err);
}
}

module.exports = { listContacts, getContactById, removeContact, addContact };
