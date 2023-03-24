/**
 * Resolves the base URL of vuepress site, based on {@link process.env.NODE_ENV}
 * 
 * @param {string} path
 * @param {string} [productionEnv] Name of a production environment 
 * 
 * @returns {"/" | `/${string}/`} '/' when not in production
 */
export function baseURL(path: string, productionEnv: string = 'production'): '/' | `/${string}/`
{
    if(process.env.NODE_ENV !== productionEnv){
        return '/';
    }

    return `/${path}/`;
}