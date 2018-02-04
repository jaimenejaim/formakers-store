'use strict';

var crypto = require('crypto');

module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true
        },
        type: {
            type: DataTypes.INTEGER,
            values: [1, 2, 3, 4],
            defaultValue: 2,
            allowNull: false,
            get: function get() {
                switch (this.getDataValue('type')) {
                    case 1:
                        return 'public'; // Frente de loja
                    case 2:
                        return 'user'; //dashboard
                    case 3:
                        return 'admin'; //dashboard
                    case 4:
                        return 'super'; //dashboard
                }
            },
            set: function set(value) {
                switch (value) {
                    case 'public':
                        return this.setDataValue('type', 1);
                    case 'user':
                        return this.setDataValue('type', 2);
                    case 'admin':
                        return this.setDataValue('type', 3);
                    case 'super':
                        return this.setDataValue('type', 4);
                }
            }
        },
        email: {
            type: DataTypes.TEXT,
            notNull: true,
            unique: {
                args: true,
                msg: 'this email is being used by someone else.'
            }
        },
        password: {
            type: DataTypes.TEXT,
            required: true,
            allowNull: false,
            validate: {
                min: {
                    args: 6,
                    msg: 'password must start with a letter, have no spaces, and be at least 6 characters.'
                },
                max: {
                    args: 100,
                    msg: 'password must start with a letter, have no spaces, and be at less than 100 characters.'
                }
            },
            set: function set(value) {
                if (value.length >= 6 && value.length <= 40) return this.setDataValue('password', crypto.createHash('md5').update(value).digest("hex"));else return this.setDataValue('password', value);
            }
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            get: function get() {
                switch (this.getDataValue('is_active')) {
                    case 0:
                        return 'no'; // Frente de loja
                    case 1:
                        return 'yes'; //dashboard
                }
            },
            set: function set(value) {
                switch (value) {
                    case 'no':
                        return this.setDataValue('is_active', 0);
                    case 'yes':
                        return this.setDataValue('is_active', 1);
                }
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        last_login: {
            type: DataTypes.DATE
        }
    });

    users.associate = function (models) {
        users.hasMany(models.users_tokens);
    };

    return users;
};
//# sourceMappingURL=users.js.map