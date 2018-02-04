'use strict';

/*
 * entidade para um futuro refresh token.
 * */

module.exports = function (sequelize, DataTypes) {
    var users_tokens = sequelize.define('users_tokens', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        current: { //token atual
            type: DataTypes.TEXT
        },
        next: { //md5 gerado para gerar o proximo token e expirar o atual.
            type: DataTypes.TEXT
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

    users_tokens.associate = function (models) {
        users_tokens.belongsTo(models.users, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            },
            defaultValue: null
        });
    };

    return users_tokens;
};
//# sourceMappingURL=users_tokens.js.map