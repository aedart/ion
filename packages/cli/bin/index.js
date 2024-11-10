#!/usr/bin/env node

// import { program } from "commander";
// import { VERSION } from "@aedart/cli";
// import { loadEnvFile } from "node:process"; 
//
// // TODO: Incomplete... how to obtain additional commands? Should this be wrapped?
//
// program
//     .version(VERSION)
//     .description(`Ion CLI v${VERSION} in ${process.cwd()}`);
//
// program
//     .command('fisk', )
//     .description('Bla bla')
//     .argument('name', 'More bla bla')
//     .action((name) => {
//         console.info('Sweet', name);
//     });
// program
//     .command('read')
//     .description('.env example')
//     .action(() => {
//         // Loads .env file from process.cwd(), unless other file is specified.
//         loadEnvFile();
//        
//         console.log(process.env);
//     });
//
// // TODO: Add commands...
//
// // Display help automatically, when no command is requested.
// // if (process.argv.length < 3) {
// //     program.help();
// // }
//
// await program.parseAsync();

import {
    CliApplication,
    DefaultCliConfigurator
} from "@aedart/cli";
import { Application } from "@aedart/core";

const core = (new Application())
    .configure(DefaultCliConfigurator)

// TODO: Add default Ion commands...

await (new CliApplication(core)).run();