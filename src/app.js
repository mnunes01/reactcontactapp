import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import Footer from './pages/footer.jsx'
import Header from './pages/header.jsx'
import Main from './pages/main.jsx'

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Main />
        </div>
      </Router>
    )
  }
}
