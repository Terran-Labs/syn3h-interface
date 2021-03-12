// @ts-ignore
const preactCliPostCSS = require("preact-cli-postcss")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob")

// Custom PurgeCSS extractor for special characters in Tailwind's classnames
class TailwindExtractor {
    /**
     * @param {string} content
     */
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || []
    }
}

// PurgeCSS webpack plugin
const purgeCssPlugin = new PurgecssPlugin({
    paths: glob.sync("./src/**/*.ts"),
    extractors: [
        {
            extractor: TailwindExtractor,
            extensions: ["ts", "tsx"],
        },
    ],
})

export default function (config, env, helpers) {
    /**
     * Function that mutates the original webpack config.
     * Supports asynchronous changes when a promise is returned (or it's an async function).
     *
     * @param {object} config - original webpack config.
     * @param {object} env - options passed to the CLI.
     * @param {WebpackConfigHelpers} helpers - object with useful helpers for working with the webpack config.
     **/

    // Use Preact CLI's helpers object to get the babel-loader
    const babel = helpers.getLoadersByName(config, "babel-loader")[0].rule
    // Update the loader config to include preact-i18nline
    babel.loader = [
        {
            // create an entry for the old loader
            loader: babel.loader,
            options: babel.options,
        },
        {
            // add the preact-i18nline webpack loader
            loader: "preact-i18nline/webpack-loader",
        },
    ]
    // remove the old loader options
    delete babel.options

    // Use postcss.config.js instead of default postCSS config
    preactCliPostCSS(config, helpers)

    config.module.rules.push({
        test: /\.tsx?$/,
        loader: require.resolve("ts-loader"),
    })

    // Run styles through purgeCSS for production only
    if (env.production) {
        config.plugins.push(purgeCssPlugin)
    }

    return config
}
