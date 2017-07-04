import { authorsFormattedForDropdown } from './selectors';
import expect from 'expect';

describe('Testing the selector to format authors for dropdowns', () => {

    it('should convert an array of authors to array of  id/value objects', () => {
        const authors = [{ id: 1, firstName: 'Sam', lastName: 'Wilson' }];

        expect(authorsFormattedForDropdown(authors)).toEqual([{ text: 'Sam Wilson', value: 1 }]);
    });
});