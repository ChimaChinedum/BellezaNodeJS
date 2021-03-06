import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'
import { connect } from 'react-redux'
import { getBackofficeProducts, resetProducts } from 'actions/product'
import queryString from 'query-string'
import Loader from 'components/Loader/Loader'


@connect(store => {
	return {
		products: store.products,
		user: store.user
	}
})
export default class ProductsIndex extends React.Component {
	constructor(props){
		super(props)
		this.state = {page: 0, prePage: 20}

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handleError = this.handleError.bind(this)
		this.unlisten = null
	}

	componentDidMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetProducts())
	}

	handleUrlChanged(location) {
		if(this.props.match.url === location.pathname){
			const parse = queryString.parse(location.search)

			this.props.dispatch(getBackofficeProducts(parse.query, parse.page, 0 , this.props.user.get('token')))
				.then()
				.catch(this.handleError)
		}
	}

	handlePageClick(index, event){
		this.setState({page: index})
	}

	handleSearch(event) {
		event.preventDefault()
		let input = event.target.elements['query']
		let search = input.value ? `?query=${input.value}&page=0&sort=0` : '?page=0&sort=0'

		this.props.history.push({
			pathname: '/backoffice/products',
			search: search
		})
	}

	handleError(response) {

	}

	render () {
		const {
			products,
			match,
			history
		} = this.props

		const productList = products.get('rows').map( (product, index) =>
			<ProductItem
				key={index}
				product={product}
				match={match}/>
		)

		const parse = queryString.parse(history.location.search)
		const links = []
		for(let i = 0; i < Math.ceil(products.get('count')/this.state.prePage); i++ ){
			if(parse.query){
				links.push({value: `${match.url}?query=${parse.query}&page=${i}`, name: i+1})
			}else{
				links.push({value: `${match.url}?page=${i}`, name: i+1})
			}
		}

		return (
			<div>
				<div className='protop'>
					<Link to={'product/new'} className='secondary-button'>Add Product</Link>
					<form onSubmit={this.handleSearch}>
						<input type='text' name='query'/>
						<input type='submit' style={{display: 'none'}}/>
					</form>
				</div>
				<Loader>
					<table className='backoffice-table'>
						<thead>
							<tr>
								<th>PLU</th>
								<th>Name</th>
								<th>Stock</th>
								<th>Update</th>
							</tr>
						</thead>

						<tbody>
							{productList}
						</tbody>

						<tfoot>
							<tr>
								<td colSpan='4'>
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

const ProductItem = props => (
	<tr>
		<td>{props.product.get('plu')}</td>
		<td>{props.product.get('name')} {props.product.get('volume')}</td>
		<td>{props.product.get('stock')}</td>
		<td>
			<Link to={`product/edit/${props.product.get('id')}`}>Update</Link>
		</td>
	</tr>
)
