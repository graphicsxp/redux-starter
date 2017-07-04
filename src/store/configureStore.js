//dynamic imports are not supported by ES6, so we are using require instead of import.
if (process.env.NODE_ENV === 'production'){
    module.exports = require('./configureStore.prod');
}else{
    module.exports = require('./configureStore.dev');
}