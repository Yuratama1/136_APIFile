module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sinopsis: { 
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tahun_terbit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    penulis_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    },{
        tableName: 'komik',
        timestamps: false,
    });

    Komik.associate = (models) => {
        Komik.belongsTo(models.Penulis, {
            foreignKey: 'Penulis_id',
            as: 'penulis',
        });
        Komik.belongsToMany(models.Genre, {
            through: 'Komik_genre',
            foreignKey: 'komik_id',
            otherKey: 'genre_id',
            as: 'genre',
        });
    };
    return Komik;
};
