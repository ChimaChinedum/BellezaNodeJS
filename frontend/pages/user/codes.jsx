import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import dateOptions from 'utils/date'


const actives = []
const deactives = []

/**
* HTTP - GET
* @param {array} codes - An array of discount codes that belong to current user
*
* LOCAL - POST
* @param {object} resetLogout - Logouts the user by reseting it with empty object
*
* LOCAL - POST (on unmount)
* @param {array} resetCodes - An empty array to reset the user codes
*/

export default class UserCodes extends React.Component {
  render () {

    const aList = actives.map( (code, index) =>
      <CodeItem key={index} {...code}/>
    )

    const dList = deactives.map( (code, index) =>
      <CodeItem key={index} {...code}/>
    )

    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Códigos de Descuento
          <Link to="#" className="sub-text light" style={{float: 'right'}}>Salir</Link>
        </h2>

        <div className="grid-wrap top around">

          {actives.length > 0 &&
            <article className="col-5 col-sm-12 box active">
              <div className="code-top">Activados</div>
              {aList}
            </article>
          }

          {deactives.length > 0 &&
            <article className="col-5 col-sm-12 box deactive">
              <div className="code-top">Desactivados</div>
              {dList}
            </article>
          }

          {actives.length == 0 && deactives.length == 0 &&
            <h4 className="sub-text">Cero Códigos Encontrados</h4>
          }

        </div>

      </section>
    )
  }
}

const CodeItem = props => (
  <div className="code-item sub-text">
    <p >Codigo: <span>{props.code}</span></p>
    <p>Descuento: <span>{props.discount}</span></p>
    <p>Fecha de Caducidad: <span>{props.expire.toLocaleString('en-us', dateOptions)}</span></p>
  </div>
)
