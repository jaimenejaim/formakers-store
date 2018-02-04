'use strict';

module.exports = function (db, DataTypes) {
    return db.define('auth_refresh_tokens', {
        refreshToken: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        expires: DataTypes.DATE
    });
};
//# sourceMappingURL=auth_refresh_tokens.js.map