import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'
import { dateOptions } from 'utils/date'
import { connect } from 'react-redux'
import { resetOrders, getAllOrders } from 'actions/order'
import queryString from 'query-string'
import Loader from 'components/Loader/Loader'


@connect(store => {
	return {
		orders: store.orders,
		user: store.user
	}
})
class BackofficeOrders extends React.Component {
	constructor(props){
		super(props)
		this.state = {page: 0, prePage: 20}

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.handleError = this.handleError.bind(this)
		this.unlisten = null
	}

	componentDidMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetOrders())
	}

	handleUrlChanged(location) {
		if(this.props.match.url === location.pathname){
			const parse = queryString.parse(location.search)

			this.props.dispatch(getAllOrders(parse.page, parse.status, this.props.user.get('token')))
				.then()
				.catch(this.handleError)
		}
	}

	handlePageClick(index, event){
		this.setState({page: index})
	}

	handleError(response) {

	}

	render () {
		const {
			orders,
			match,
			history
		} = this.props

		const orderList = orders.get('rows').map( (order, index) =>
			<OrderRow key={index} order={order}/>
		)

		const parse = queryString.parse(history.location.search)
		const links = []
		for(let i = 0; i < Math.ceil(orders.get('count')/this.state.prePage); i++ ){
			links.push({value: `${match.url}?status=${parse.status}&page=${i}`, name: i+1})
		}

		return (
			<div>
				<ul className='backorders-nav'>
					<li>
						<Link
							className={parse.status === 'intencion' ? 'active' : ''}
							to={`${match.url}?status=intencion&page=0`}>Intención</Link>
					</li>
					<li>
						<Link
							className={parse.status === 'pendiente' ? 'active' : ''}
							to={`${match.url}?status=pendiente&page=0`}>Pendiente</Link>
					</li>
					<li>
						<Link
							className={parse.status === 'pagado' ? 'active' : ''}
							to={`${match.url}?status=pagado&page=0`}>Pagado</Link>
					</li>
					<li>
						<Link
							className={parse.status === 'cancelado' ? 'active' : ''}
							to={`${match.url}?status=cancelado&page=0`}>Cancelado</Link>
					</li>
				</ul>

				<Loader>
					<table className='backoffice-table'>
						<thead>
							<tr>
								<th>Referencia</th>
								<th>Fecha</th>
								<th>Cliente</th>
								<th>Total</th>
								<th>Details</th>
							</tr>
						</thead>

						<tbody>
							{orderList}
						</tbody>

						<tfoot>
							<tr>
								<td colSpan='5'>
									<Pagination
										links={links}
										page={this.state.page}
										onRequestClick={this.handlePageClick}/>
								</td>
							</tr>
						</tfoot>
					</table>
				</Loader>

			</div>
		)
	}
}

export default BackofficeOrders


const OrderRow = props => (
	<tr>
		<td>{props.order.get('id')}</td>
		<td>{new Date(props.order.get('created_at')).toLocaleString('en-us', dateOptions)}</td>
		<td>{props.order.get('user').get('first_name')} {props.order.get('user').get('last_name')}</td>
		<td>${(props.order.get('total')/100).toFixed(2)}</td>
		<td>
			<Link to={`/user/${props.order.get('user').get('id')}/order/${props.order.get('id')}`}>Details</Link>
		</td>
	</tr>
)
