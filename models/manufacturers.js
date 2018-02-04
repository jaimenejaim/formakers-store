'use strict';

module.exports = (sequelize, DataTypes) => {
    const manufacturers = sequelize.define('manufacturers', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT
        },
        description : {
          type: DataTypes.TEXT,
            allowNull : true,
            unique : {
              args: true,
                msg : 'The manufacturer with the informed description is already in use.'
            }
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
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    });
    manufacturers.associate = function (models) {
        manufacturers.hasMany(models.products);
    };

    return manufacturers;
};
