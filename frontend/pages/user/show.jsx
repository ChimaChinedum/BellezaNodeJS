import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import UserDetails from 'pages/user/details'
import UserOrders from 'pages/user/orders'
import UserAddresses from 'pages/user/addresses'
import UserCodes from 'pages/user/codes'


class UserShow extends React.Component {
	render () {
		const {
			user,
			match
		} = this.props

		if(!user.get('token')){
			return <Redirect to='/signin'/>
		}

		return (
			<main className='grid-wrap around top'>

				<section className='col-3 col-sm-4 col-xs-12'>
					<ul id='user-options' className='box'>
						<h4>Mis Pedidos</h4>
						<li>
							<Link to={`${match.url}/orders?page=0`}>Historial de Pedidos</Link>
						</li>

						<h4>Mis detalles</h4>
						<li>
							<Link to={`${match.url}/details`}>Detalles</Link>
						</li>

						<li>
							<Link to={`${match.url}/addresses`}>Directorio</Link>
						</li>

						<li>
							<Link to={`${match.url}/codes`}>Códigos de Descuento</Link>
						</li>

						{user.get('admin') &&
							<li>
								<Link to='/backoffice/orders?status=pendiente&page=0'>Backoffice</Link>
							</li>
						}

						<h4>Privacidad</h4>
						<li>
							<Link to='/terminosCondiciones'>Política de Privacidad</Link>
						</li>
					</ul>
				</section>

				<Route exact path={`${match.path}/`} component={UserDetails}/>
				<Route exact path={`${match.path}/details`} component={UserDetails}/>
				<Route path={`${match.path}/orders`} component={UserOrders}/>
				<Route path={`${match.path}/addresses/`} component={UserAddresses}/>
				<Route path={`${match.path}/codes`} component={UserCodes}/>
			</main>
		)
	}
}

export default UserShow
