'use strict'
let valmsg =  require('../helpers/validationMessages.js')
let Sequelize = require('sequelize')

module.exports = function(sequelize, DataTypes) {
	const Category =  sequelize.define('Category', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(60),
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
				len: {
					args: [1, 60],
					msg: valmsg.len(1, 60)
				},
			}
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		parent_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Category',
				key: 'id'
			}
		},
		active: {
			type: DataTypes.BOOLEAN(),
			allowNull: false,
		}
	}, {
		tableName: 'categories'
	})

	Category.formattedAll = function () {
		return this.findAll({
			where: {
				active: true
			},
			include: [{
				model: this,
				as: 'subs',
				where: {
					id: Sequelize.col('subs.parent_id'),
					active: true
				},
				include: [{
					model: this,
					as: 'subs',
					where: {
						id: Sequelize.col('subs.parent_id'),
						active: true 
					}
				}]
			}],
			rejectOnEmpty: true
		})
	}

	return Category
}
