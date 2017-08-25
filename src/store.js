import { applyMiddleware, createStore } from 'redux'

import reducer from './reducers/contacts.js'

export default createStore(reducer)
