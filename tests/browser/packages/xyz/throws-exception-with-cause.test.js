/**
 * @see https://github.com/jasmine/jasmine/issues/2028
 */
xdescribe('@aedart/xyz', () => {
    it('fails...', () => {

        throw new Error('Oh my...', {
            cause: { foo: 'bar' }
        });

    });
});