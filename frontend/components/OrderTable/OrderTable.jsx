import React, { PropTypes } from 'react'
import classnames from 'classnames'
import QuantityDrop from 'components/QuantityDrop/QuantityDrop'



class OrderTable extends React.Component {
  constructor(props){
    super(props)

  }

  handleInputChange(index, value) {
    this.props.onRequestInputChange(index, value)
  }

  handleRemove(index, event){
    this.props.onRequestRemove(index)
  }

  render () {
    const {
      order,
      editable
    } = this.props

    const detList = order.get('details').map( (detail, index) =>
      <OrderRow
        key={detail.get('product_id')}
        detail={detail}
        editable={editable}
        onRequestChange={this.handleInputChange.bind(this, index)}
        onRequestRemove={this.handleRemove.bind(this, index)}/>
    )

    return (
      <div style={{width: "100%"}}>
        <table className='order-table'>
          <thead>
            <tr className="col-xs-hide">
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th className="overflow-text">Subtotal <span className="sub-text" style={{fontSize: '0.7em'}}>Sin IVA</span></th>
              {this.props.editable && <th></th> }
            </tr>
          </thead>

          <tbody>
            {detList}
          </tbody>
        </table>

        <div className="order-table-foot">
          <div className="sub-titles">
            <span>Subtotal:</span>
            <span>IVA:</span>
            <span>Costo de Envío: </span>
            <span>Discount:</span>
            <span>Total:</span>
          </div>
          <div>
            <span className="foot-main">${(order.get('sub_total')/100).toFixed(2)}</span>
            <span className="foot-main">${(order.get('iva_total')/100).toFixed(2)}</span>
            <span className="foot-main">${(order.get('shipping_total')/100).toFixed(2)}</span>
            <span className="foot-main">-${(order.get('discount_total')/100 ).toFixed(2)}</span>
            <span className="foot-main">${(order.get('total')/100).toFixed(2)}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderTable;


const OrderRow = (props) => (
  <tr>
    <td>
      <picture>
        <source
          srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xs/${props.detail.get('plu')}.jpg`}
          media="(max-width: 712px)"/>
        <img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/sm/${props.detail.get('plu')}.jpg`}/>
      </picture>
    </td>

    <td className="xs-td" colSpan="4">
      <span className="xs-span">
        {props.detail.get('name')}
      </span>

      <span className="xs-span">
        <span className="sub-text">Precio: </span>${(props.detail.get('price')/100).toFixed(2)}
      </span>

      <span className="xs-span">
        {props.editable ?
          <QuantityDrop
            stock={props.detail.get('stock')}
            defaultValue={props.detail.get('quantity')}
            onRequestChange={props.onRequestChange}/>
          :
          props.detail.get('quantity')
        }
      </span>

      <span className="xs-span">
        <span className="sub-text">Subtotal: </span>${(props.detail.get('sub_total')/100).toFixed(2)}
      </span>
    </td>


    <td className="sm-td">
      {props.detail.get('name')}
    </td>

    <td className="sm-td">
      ${(props.detail.get('price')/100).toFixed(2)}
    </td>

    <td className="sm-td">
      {props.editable ?
        <QuantityDrop
          stock={props.detail.get('stock')}
          defaultValue={props.detail.get('quantity')}
          onRequestChange={props.onRequestChange}/>
        :
        props.detail.get('quantity')
      }
    </td>

    <td className="sm-td">
      ${(props.detail.get('sub_total')/100).toFixed(2)}
    </td>

    {props.editable &&
      <td>
          <i className="material-icons" onClick={props.onRequestRemove}>clear</i>
      </td>
    }
  </tr>
)
