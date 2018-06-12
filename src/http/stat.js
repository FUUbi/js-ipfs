'use strict'

const Joi = require('joi')

const mfsStat = (api) => {
  api.route({
    method: 'POST',
    path: '/api/v0/files/stat',
    config: {
      handler: (request, reply) => {
        const {
          ipfs
        } = request.server.app
        const {
          arg,
          hash,
          size,
          withLocal
        } = request.query

        return ipfs.files.stat(arg, {
          hash,
          size,
          withLocal
        })
          .then(stats => {
            reply({
              Type: stats.type,
              Blocks: stats.blocks,
              Size: stats.size,
              Hash: stats.hash,
              CumulativeSize: stats.cumulativeSize,
              WithLocality: stats.withLocality,
              Local: stats.local,
              SizeLocal: stats.sizeLocal
            })
          })
      },
      validate: {
        options: {
          allowUnknown: true,
          stripUnknown: true
        },
        query: {
          arg: Joi.string().default('/'),
          hash: Joi.boolean().default(false),
          size: Joi.boolean().default(false),
          withLocal: Joi.boolean().default(false)
        }
      }
    }
  })
}

module.exports = mfsStat
