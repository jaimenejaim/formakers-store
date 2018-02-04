'use strict';

module.exports = function (db, DataTypes) {
    return db.define('auth_clients', {
        clientId: {
            type: DataTypes.STRING,
            unique: true
        },
        clientSecret: DataTypes.STRING,
        clientType: {
            type: DataTypes.INTEGER,
            values: [1, 2],
            defaultValue: 2,
            allowNull: false,
            get: function get() {
                switch (this.getDataValue('clientType')) {
                    case 1:
                        return 'public'; // Frente de loja
                    case 2:
                        return 'web_application'; //dashboard
                }
            },
            set: function set(value) {
                switch (value) {
                    case 'public':
                        return this.setDataValue('clientType', 1);
                    case 'web_application':
                        return this.setDataValue('clientType', 2);
                }
            }
        },
        userId: DataTypes.INTEGER,
        redirectUri: DataTypes.STRING
    });
};
//# sourceMappingURL=auth_clients.js.map