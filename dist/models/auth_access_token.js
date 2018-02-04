'use strict';

module.exports = function (db, DataTypes) {
    return db.define('auth_access_tokens', {
        accessToken: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        expires: DataTypes.DATE
    });
};
//# sourceMappingURL=auth_access_tokens.js.map