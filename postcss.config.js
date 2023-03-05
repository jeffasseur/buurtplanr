module.export = {
        plugins: {
            'postcss-import': {},
            'postcss-preset-env': {
                stage: 1,
                features: {
                    'custom-media-queries': {
                        importFrom: './src/assets/styles/media-queries.css'
                    }
            }
        }
    }
}