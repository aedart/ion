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
        Facade.setContainer(app);
        
        app.terminating(() => {
            Facade.destroy();
            
            return Promise.resolve(true);
        });
    }
}