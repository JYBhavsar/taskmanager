import React from 'react'
import PropTypes from 'prop-types'


export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <span className="navbar-brand" to="/">
            <img src="./logo.png" alt="I am manager" height={100}  />
            {props.title}
          </span>
        </div>
      </nav>
    )
}

Header.defaultProps = {
  title: "Your Title Here",
}

Header.propTypes = {
  title: PropTypes.string,
}