require.config({
    'baseUrl': 'src',
    'paths': {
    },
    'packages': [
        {
            'name': 'est',
            'location': '../dep/est/2.0.3/src'
        },
        {
            'name': 'underscore',
            'location': '../dep/underscore/1.8.5/src',
            'main': 'underscore'
        },
        {
            'name': 'jquery',
            'location': '../dep/jquery/1.9.1/src',
            'main': 'jquery.min'
        }
    ]
});
