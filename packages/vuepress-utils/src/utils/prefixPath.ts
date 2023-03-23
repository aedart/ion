/**
 * Prefix given path
 *
 * @param {string} prefix
 * @param {string} path
 *
 * @returns {string}
 */
export function prefixPath(prefix: string, path: string): string
{
    if (!path.startsWith('/')) {
        path = '/' + path;
    }

    return (prefix + path).replaceAll('//', '/');
}