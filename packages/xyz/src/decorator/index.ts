import logMethodCall from "./logMethodCall";
import DummyLogger from "./DummyLogger";

/**
 * A Character
 */
class Character
{
    /**
     * Move this character
     */
    @logMethodCall
    move() {
        DummyLogger.log('Moving');
    }
}

export {
    logMethodCall,
    DummyLogger,
    Character as default
}
