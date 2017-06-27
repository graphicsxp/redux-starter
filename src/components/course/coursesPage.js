import React, {PropTypes} from 'react';

class CoursesPage extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default CoursesPage;
