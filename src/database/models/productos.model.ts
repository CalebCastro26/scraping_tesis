import {Model, DataTypes} from 'sequelize'
import type {Sequelize} from 'sequelize'
import { TIEDAS_TABLE } from './tiendas.model'


export const PRODUCTO_TABLE = 'producto'

export const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  imgSrc: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dataOriginal: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  imgTitle: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  priceDolar: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  priceSoles: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  tiendaId: {
    allowNull: false,
    field: 'tienda_id',
    type: DataTypes.INTEGER,
    references: {
      model: TIEDAS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}

export class Producto extends Model {
  static associate(models: Sequelize['models']) {
    this.belongsTo(models.Tiendas, { as: 'tienda' });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: 'Producto',
      timeStamps: false,
      createdAt: false,
      updatedAt: false
    }
  }
}
