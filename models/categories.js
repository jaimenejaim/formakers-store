'use strict';

module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('categories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description : {
            type: DataTypes.TEXT,
            allowNull : true
        },
        is_active : {
            type : DataTypes.INTEGER,
            require: true,
            defaultValue : 1,
            get: function () {
                switch (this.getDataValue('is_active')) {
                    case 1:
                        return 'enabled';
                    case 0:
                        return 'disabled';
                }

            },
            set: function (value) {
                switch (value) {
                    case 'enabled':
                        return this.setDataValue('is_active', 1);
                    case 'disabled':
                        return this.setDataValue('is_active', 0);
                }
            }
        },
        is_inactiveAt : {
          type: DataTypes.DATE,
          allowNull : true
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
    categories.associate = function (models) {
        categories.hasMany(models.products);
    };

    return categories;
};
