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
    move()
    {
        DummyLogger.log('Moving');
    }
}

/**
 * Orc Character
 */
class Orc extends Character
{
    /**
     * @inheritdoc
     */
    @logMethodCall
    move()
    {
        DummyLogger.log('Orc Moving');
    }

    /**
     * Makes the orc talk...
     */
    talk()
    {
        DummyLogger.log('Orc talking...');
    }
}

export {
    logMethodCall,
    DummyLogger,
    ChannelLogger,
    Character as default,
    Orc
}
