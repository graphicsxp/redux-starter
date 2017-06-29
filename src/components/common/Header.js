import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
    return (
        <nav>
            <IndexLink to="/" activateClassName="active">Home</IndexLink>
            {" | "}
            <IndexLink to="/courses" activateClassName="active">Courses</IndexLink>
            {" | "}
            <Link to="/about" activateClassName="active">About</Link>
            {loading && <LoadingDots interval={100} dots={20} />}
        </nav>
    );
};

Header.propTypes = {
    loading: React.PropTypes.bool
}

export default Header;