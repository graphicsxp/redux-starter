import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import { authorsFormattedForDropdown } from '../../selectors/selectors';

//by exporting the class we can test it without using the redux connect feature, which is used in the default export at the bottom of this file.
//default export will still work just fine as long as we use the following import statement in child components:
//import ManageCoursePage from './ManageCoursePage';
//For tests, we'd use the following import statement:
//import {ManageCoursePage} from './ManageCoursePage';


export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        //shortcuts to avoid binding directly in the jsx
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id !== nextProps.course.id) {
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({ saving: true });

        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Course saved');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                allAuthors={this.props.authors}
                course={this.state.course}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: React.PropTypes.object.isRequired,
    authors: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

//pull in the react router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: React.PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id === id);
    if (course) return course[0];
    return null;
}

//ownProps is a reference to this component's props
function mapStateToProps(state, ownProps) {
    const courseId = ownProps.routeParams.id;  //from the path 
    let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);