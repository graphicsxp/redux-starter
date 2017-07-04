import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from './ManageCoursePage';

describe('Manage Course Page', () => {
    it('should sets an error message when trying to save a course with an empty title', () => {

        //because we are testing the raw component (without connect), mapStateToProps is no longer call and we 
        //need to initialize props manually in order to avoid 
        const props = {
            authors: [],
            course: { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' },
            actions: { saveCourse: () => { return Promise.resolve(); } }
        };

        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});