'use strict';

module.exports = function (sequelize, DataTypes) {
    var productsphotos = sequelize.define('productsphotos', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        photo_id: {
            type: DataTypes.TEXT,
            require: true,
            allowNull: false
        },
        url: {
            type: DataTypes.TEXT,
            require: true,
            allowNull: false
        },
        cover: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
    productsphotos.associate = function (models) {

        productsphotos.belongsTo(models.products, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true
            },
            defaultValue: null
        });
    };

    return productsphotos;
};
//# sourceMappingURL=productsphotos.js.map