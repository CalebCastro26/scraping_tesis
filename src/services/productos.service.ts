import { sequelize } from "../database/sequilize_connection"
import isNumber from 'is-number';
import boom from '@hapi/boom'
import { Op } from "sequelize";

export class ProductosService {
  constructor() {}

  async findAll(limit: number, offset: number){
    if ( !isNumber(offset) || !isNumber(limit)) {
      throw boom.badRequest('El offset y el limit deben ser números')
    }

    const productos = await sequelize.models.Producto.findAndCountAll({
      limit,
      offset,
      include: ['tienda']
    })

    return {
      statusCode : 200,
      data : productos
    }
  }

  async create(data: any){
    const newProducto = await sequelize.models.Producto.create({
      ...data,
      tiendaId: data.tienda_id
    })
    return newProducto
  }

  async findByName(limit: number, offset: number, nombre: string){
    if ( !isNumber(offset) || !isNumber(limit)) {
      throw boom.badRequest('El offset y el limit deben ser números')
    }

    const productos = await sequelize.models.Producto.findAndCountAll({
      where: {
        "imgTitle": {
          [Op.substring]: nombre.toLocaleUpperCase()
        }
      },
      limit,
      offset,
      include: ['tienda']
    })

    return {
      statusCode : 200,
      data : productos
    }
  }

  async findByTienda(){
    return []
  }

  async deleteAll() {
    await sequelize.query('DELETE FROM producto')
  }
}
