import type { Application, Bootstrapper } from "@aedart/contracts/core";
import { Facade } from "@aedart/support/facades";

/**
 * Setup Facades - Application Bootstrapper
 */
export default class SetupFacades implements Bootstrapper {

    /**
     * Setups Facades
     *
     * @param {Application} app
     *
     * @return {void}
     */
    bootstrap(app: Application): void {
        Facade.forgetAllResolved();
        
        Facade.setContainer(app);
        
        // Register cleanup...
        app.destroying(() => {
            Facade.destroy();
        });
    }
}