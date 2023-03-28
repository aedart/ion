import Person from "@aedart/xyz";
import MESSAGE from "@aedart/xyz/submodule_a";
import Box, { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "@aedart/xyz/submodule_b";

describe('@aedart/xyz', () => {

    describe('Main module', () => {

        it('can create new instance of Person', function () {

            let person = new Person();

            // Debug
            //console.log(Person.toString())

            expect(person)
                .not
                .toBeNull()
        });
    });

    describe('Submodule A', () => {

        it('can import const from submodule', function () {

            // Debug
            // console.log(MESSAGE);

            expect(MESSAGE)
                .not
                .toBeNull();
        });
    });

    describe('Submodule B', () => {

        it('can create box instance', function () {

            let length = 22;
            let box = new Box(DEFAULT_WIDTH, DEFAULT_HEIGHT, length);

            // Debug
            //console.log(box);

            expect(box)
                .withContext('Box should not be null')
                .not
                .toBeNull();

            expect(box.width)
                .withContext('Incorrect width')
                .toBe(DEFAULT_WIDTH);

            expect(box.height)
                .withContext('Incorrect height')
                .toBe(DEFAULT_HEIGHT);

            expect(box.length)
                .withContext('Incorrect length')
                .toBe(length);
        });
    })
});
