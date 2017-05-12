import React, { PropTypes } from 'react'
import classnames from 'classnames'

const ord = {
  details: []
}

class OrderTable extends React.Component {
  constructor(props){
    super(props)

  }

  handleInputChange(index, event) {
    this.props.onRequestChange(index, event)
  }

  render () {

    const colSpan = this.props.editable ? 5 : 4
    const tableClasses = classnames('order-table', this.props.size)

    const detList = ord.details.map( (detail, index) =>
      <OrderRow
        key={index} {...detail}
        editable={this.props.editable}
        onRequestChange={this.handleInputChange.bind(this, index)}/>
    )

    return (
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th className="overflow-text">Subtotal <span>Sin IVA</span></th>
            {this.props.editable && <th></th>}

          </tr>
        </thead>

        <tbody>
          {detList}
        </tbody>

        <tfoot className="order-table-foot">
          <tr>
            <td colSpan={colSpan}>Subtotal: </td>
            <td className="foot-main">${ord.subtotal}</td>
          </tr>
          <tr>
            <td colSpan={colSpan}>IVA:</td>
            <td className="foot-main">${ord.iva}</td>
          </tr>
          <tr>
            <td colSpan={colSpan}>Discount:</td>
            <td className="foot-main">${ord.discount}</td>
          </tr>
          <tr>
            <td colSpan={colSpan}>Costo de Envío: </td>
            <td className="foot-main">${ord.shippingCost}</td>
          </tr>
          <tr>
            <td colSpan={colSpan}>Total:</td>
            <td className="foot-main">${ord.total}</td>
          </tr>

        </tfoot>

      </table>
    )
  }
}

export default OrderTable;


const OrderRow = (props) => (
  <tr>
    <td>
      <img src={props.pimg}/>
    </td>

    <td>
      {props.description}
    </td>

    <td>
      ${props.price}
    </td>

    <td>
      {props.editable ?
        <input type="number" max="10" min="0" value={props.quantity} onChange={props.onRequestChange}/>
        :
        props.quantity
      }
    </td>

    <td>
      ${props.subtotal}
    </td>

    {props.editable &&
      <td>
        <a href="#">Eliminar</a>
      </td>
    }
  </tr>
)
