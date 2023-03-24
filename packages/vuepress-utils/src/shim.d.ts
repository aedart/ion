/**
 * @see https://www.thisdot.co/blog/how-to-create-and-deploy-a-vue-component-library-to-npm
 * @see https://fettblog.eu/typescript-modules-for-webpack/
 */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}