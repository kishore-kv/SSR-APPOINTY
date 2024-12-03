module.exports = {
    ignore: [/(node_modules)/],
    presets: ['@babel/env', '@babel/react'],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator',
        '@babel/transform-arrow-functions',
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    src: './src',
                    '@components': './src/components',
                    '@views': './src/views',
                    '@layout': './src/layout',
                },
            },
        ],
    ],
};
