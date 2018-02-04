'use strict';

module.exports = function (sequelize, DataTypes) {
    var auth_accesstokens = sequelize.define('auth_accesstokens', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        token: {
            type: DataTypes.TEXT
        },
        access_token: {
            type: DataTypes.TEXT
        },
        is_inactiveAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    });

    return auth_accesstokens;
};
//# sourceMappingURL=auth_accesstokens.js.map