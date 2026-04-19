import {logMethodCall} from "./logMethodCall.js";
import DummyLogger from "./DummyLogger.js";
import ChannelLogger from "./ChannelLogger.js";

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
