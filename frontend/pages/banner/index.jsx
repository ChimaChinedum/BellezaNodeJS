import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'
import dateOptions from 'utils/date'


const bans = []
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

/**
* HTTP - GET
* @param {array} banners - An array of banners
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to banners array
*/

class BannersIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }


  render () {
    const bannerList = bans.map( (banner, index) =>
      <BannerItem key={index} {...banner} />
    )

    return (
      <div>
        <div className="protop">
          <Link to ="/backoffice/banners/new" className="secondary-button">Add Banner</Link>
        </div>

        <table className="backoffice-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Link To</th>
              <th>Active</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {bannerList}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="6">
                <Pagination
                  links={links}
                  page={this.state.page}
                  onRequestClick={this.handlePageClick}/>
              </td>
            </tr>
          </tfoot>
        </table>

      </div>
    )
  }
}

export default BannersIndex;


const BannerItem = props => (
  <tr>
    <td>
      <img className="banner-sm" src={props.img}/>
    </td>
    <td>
      <Link to={props.link}>Link</Link>
    </td>
    <td>{props.active ? "Yes": "No"}</td>
    <td>{props.start.toLocaleString('en-us', dateOptions)}</td>
    <td>{props.end.toLocaleString('en-us', dateOptions)}</td>
    <td>
      <Link to='/backoffice/banners/edit'>Update</Link>
    </td>
  </tr>
)
