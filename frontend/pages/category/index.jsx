import React from 'react'
import { Link } from 'react-router-dom'

const cate = {mains: []}

/**
* LOCAL - GET
* @param {object} category - A object with a category information and its sub categories
*
*/

export default class CategoryIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const sideList = cate.mains.map( (cat, index) =>
      <li key={index}>
        <Link to={cat.to}>{cat.name}</Link>
      </li>
    )

    const gridList = cate.mains.map( (cat, index) =>
      <div className="col-4 col-sm-6 col-xxs-12" key={index}>
        <Link to={cat.to} className="category-item" style={{backgroundImage: 'url(http://placehold.it/300x125)'}}>
          <h3 className="highlight">{cat.name}</h3>
        </Link>
      </div>
    )

    return (
      <main className="grid">
        <section className="col-3 col-xs-hide">
          <h3>{cate.name}</h3>
          <ul className="ul-dots">
            {sideList}
          </ul>
        </section>

        <section className="col-9 col-xs-12">
          <div className="category-cover" style={{backgroundImage: 'url(http://placehold.it/852x300)'}}>
            <h2>{cate.name}</h2>
          </div>

          <div className="grid-wrap">
            {gridList}
          </div>

        </section>
      </main>
    )
  }
}
