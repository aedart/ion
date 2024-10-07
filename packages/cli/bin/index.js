#!/usr/bin/env node

import { program } from "commander";
import { VERSION } from "@aedart/cli";

// TODO: Incomplete... how to obtain additional commands? Should this be wrapped?

program
    .version(VERSION)
    .description(`Ion CLI v${VERSION}`)
    .command('fisk', )
    .description('Bla bla')
    .argument('name', 'More bla bla')
    .action((name) => {
        console.info('Sweet', name);
    });

// TODO: Add commands...

// Display help automatically, when no command is requested.
if (process.argv.length < 3) {
    program.help();
}

await program.parseAsync();