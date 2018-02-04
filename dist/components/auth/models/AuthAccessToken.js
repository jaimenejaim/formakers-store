'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var AuthAccessTokens = new Schema({
    id: Number,
    token: String,
    refreshToken: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// the schema is useless so far
// we need to create a model using it
var UsersTokens = mongoose.model('AuthAccessTokens', AuthAccessTokens);

// make this available to our users in our Node applications
module.exports = UsersTokens;
//# sourceMappingURL=AuthAccessToken.js.map