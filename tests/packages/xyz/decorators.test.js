import Character, {DummyLogger, logMethodCall} from "@aedart/xyz/decorator";

describe('@aedart/xyz', () => {

    describe('Decorators module', () => {

        it('logs method calls', function () {

            // This test ensures that the typescript + rollup bundle works as intended
            // with decorators.

            let character = new Character();
            character.move();

            let entries = DummyLogger.entries;

            // Debug
            //console.log(entries);

            expect(entries.length)
                .withContext('Incorrect amount of entries recorded in Dummy Logger')
                .toBe(3);

            // --------------------------------------------------------------------------------- //
            // Context in log....

            let context = entries[0][1];

            // Debug
            // console.log(context.kind);
            // console.log(context.name);

            expect(context.kind)
                .withContext('Context should be a method')
                .toBe('method');

            expect(context.name)
                .withContext('Context name should be move')
                .toBe('move');

            // --------------------------------------------------------------------------------- //
            // Cleanup

            DummyLogger.clear();
        });

        it('can decorate using exported decorator', function () {

            // This test ensures that the rollup, webpack and babel works as intended with
            // decorators in the tests.

            class Foo
            {
                @logMethodCall
                bar() {
                    return 'bar';
                }
            }

            const foo = new Foo();
            foo.bar();

            // --------------------------------------------------------------------------------- //

            let entries = DummyLogger.entries;

            // Debug
            // console.log(entries);

            expect(entries.length)
                .withContext('Incorrect amount of entries recorded in Dummy Logger')
                .toBe(2);

            // --------------------------------------------------------------------------------- //
            // Context in log....

            let context = entries[0][1];

            // Debug
            // console.log(context.kind);
            // console.log(context.name);

            expect(context.kind)
                .withContext('Context should be a method')
                .toBe('method');

            expect(context.name)
                .withContext('Context name should be bar')
                .toBe('bar');

            // --------------------------------------------------------------------------------- //
            // Cleanup

            DummyLogger.clear();
        });
    });

});
