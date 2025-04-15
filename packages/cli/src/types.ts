import type { ChalkInstance } from "chalk";

/**
 * Callback that is responsible for styling given text
 */
export type StyleTextCallback = (text: string, chalk: ChalkInstance) => string;