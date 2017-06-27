import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = function() {
    return (
        <nav>
            <IndexLink to="/" activateClassName="active">Home</IndexLink>
            {" | "}
            <IndexLink to="/courses" activateClassName="active">Courses</IndexLink>
            {" | "}
            <Link to="/about" activateClassName="active">About</Link>
        </nav>
    );
};

export default Header;