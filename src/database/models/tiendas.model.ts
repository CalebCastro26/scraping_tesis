import {Model, Sequelize, DataTypes} from 'sequelize'

export const TIEDAS_TABLE = 'tiendas'

export const TiendasSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  }
}

export class Tiendas extends Model {
  static associate(models: Sequelize['models']) {
    this.hasOne(models.Producto, {
      as: 'producto',
      foreignKey: 'tienda_id'
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TIEDAS_TABLE,
      modelName: 'Tiendas',
      timeStamps: false,
      createdAt: false,
      updatedAt: false
    }
  }
}
