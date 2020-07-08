import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import Contacts from '../Contacts'
import ContactAddForm from '../ContactAddForm'
import SearchPanel from '../SearchPanel'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

const theme = createMuiTheme()

let maxId = 0;

function App() {
	const [contacts, setContacts] = useState([
		createContact('Mom 89621234567'),
		createContact('Dad 88005553535')
	]);

	const [searchValue, setSearchValue] = useState('')

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

    function createContact(name) {
		return {
			name,
			id: maxId++,
			isEditMode: false
		}
	}

	function deleteContact(id) {
		setContacts(() => {
			const index = contacts.findIndex((el) => el.id === id);
			
			const newArray = [
				...contacts.slice(0, index),
				...contacts.slice(index + 1)
			]

			return newArray;
		})
	}

	function addContact(name) {
		const newContact = createContact(name);
		setContacts(() => {
			const newArray = [
				...contacts,
				newContact
			]

			return newArray;
		})
	}

	function editContact(id) {
		setContacts(() => {
			const newContact = {
				name: contacts[id].name,
				id,
				isEditMode: !contacts[id].isEditMode
			}

			const index = contacts.findIndex((el) => el.id === id);

			const newArray = [
				...contacts.slice(0, index),
				newContact,
				...contacts.slice(index + 1)
			]

			return newArray;
		})
	}

	function handleInputKeyDownPress({ id, inputValue}) {
		setContacts(() => {
			const newContact = {
				name: inputValue,
				id,
				isEditMode: !contacts[id].isEditMode
			}

			const index = contacts.findIndex((el) => el.id === id);

			const newArray = [
				...contacts.slice(0, index),
				newContact,
				...contacts.slice(index + 1)
			]

			return newArray;
		})
	}

	function updateSearchValue(inputValue) {
		setSearchValue(inputValue);
	}

	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/contacts" render={() => {
						return (
							<div className="container">
								<h1 className="title">Contacts</h1>
								<Contacts
									contacts={contacts}
									searchValue={searchValue}
									onDeleted={deleteContact}
									onEdited={editContact}
									onKeyDown={handleInputKeyDownPress}/>
								<ContactAddForm onContactAdded={addContact}/>
								<SearchPanel updateSearchValue={updateSearchValue}/>
							</div>)
					}}/>
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}

export default App;