import { ConfigurationFactory } from "@aedart/support/concerns";

/**
 * Returns a new concern configuration factory instance
 * 
 * @returns {ConfigurationFactory}
 */
export default function makeConfigurationFactory()
{
    return new ConfigurationFactory();
}