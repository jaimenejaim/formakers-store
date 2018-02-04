'use strict';

module.exports = function (sequelize, DataTypes) {
    var products = sequelize.define('products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        title: {
            type: DataTypes.TEXT,
            unique: {
                args: true,
                msg: 'the product with the provided title is already in use.'
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: true,
            isEmpty: {
                msg: ''
            }
        },
        type: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 1,
            get: function get() {
                switch (this.getDataValue('type')) {
                    case 1:
                        return 'product';
                    case 0:
                        return 'course';
                }
            },
            set: function set(value) {
                switch (value) {
                    case 'product':
                        return this.setDataValue('type', 1);
                    case 'course':
                        return this.setDataValue('type', 0);
                }
            }
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DOUBLE
        },
        is_active: {
            type: DataTypes.INTEGER,
            require: true,
            defaultValue: 1,
            get: function get() {
                switch (this.getDataValue('is_active')) {
                    case 1:
                        return 'enabled';
                    case 0:
                        return 'disabled';
                }
            },
            set: function set(value) {
                switch (value) {
                    case 'enabled':
                        return this.setDataValue('is_active', 1);
                    case 'disabled':
                        return this.setDataValue('is_active', 0);
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
        }
    });

    products.associate = function (models) {
        products.hasMany(models.productsphotos);

        products.belongsTo(models.categories, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            },
            defaultValue: null
        });
        products.belongsTo(models.manufacturers, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            },
            defaultValue: null
        });
    };

    return products;
};
//# sourceMappingURL=products.js.map