'use strict'
const Database = use('Database')
const Equipamento = use('App/Models/Staff/Equipamento')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with equipamentos
 */
class EquipamentoController {
  /**
   * Show a list of all equipamentos.
   * GET equipamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const equipamento = await Equipamento.query()
      .orderBy('categoriaEquipamento')
      .orderBy('nomeEquipamento')
      .orderBy('nomeExercicio')
      .fetch()
    return response.json({ "equipamento": equipamento })
  }

  async indexCategoria({ response }) {
    try {
      const categoria = await Equipamento
        .query()
        .distinct('categoriaEquipamento')
        .fetch()
      return response.json({ 'categoria': categoria })
    } catch (error) {
      return { 'message': error.message }
    }
  }

  async indexEquipamento({ params }) {
    const categoria = params.categoriaEquipamento
    try {
      const categoria = await Equipamento
        .query()
        .where('categoriaEquipamento', categoria)
        .distinct('categoriaEquipamento')
        .fetch()
      const equipamento = await Database
        .table('equipamentos')
        .where('categoriaEquipamento', categoria)
        .distinct('nomeEquipamento')
      return response.send({ equipamento, categoria })
    } catch (error) {
      return response.json({ 'message': error.message })
    }
  }

  /**
   * Render a form to be used for creating a new equipamento.
   * GET equipamentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new equipamento.
   * POST equipamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single equipamento.
   * GET equipamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing equipamento.
   * GET equipamentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update equipamento details.
   * PUT or PATCH equipamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a equipamento with id.
   * DELETE equipamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}
module.exports = EquipamentoController