import logMethodCall from "./logMethodCall";
import DummyLogger from "./DummyLogger";
import ChannelLogger from "./ChannelLogger";

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
    ChannelLogger,
    Character as default
}
