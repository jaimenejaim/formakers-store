'use strict';

module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('auth_users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        username: {
            type: DataTypes.TEXT,
            unique: true,
            notNull: true
        },
        password: {
            type: DataTypes.TEXT
        },
        is_active: {
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

    return users;
};
//# sourceMappingURL=users.js.map