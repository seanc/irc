import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import contains from '../modules/contains'

const PeopleList = React.createClass({
  mixins: [PureRenderMixin],

  getInitialState () {
    return { filter: '' }
  },

  setFilteredValue (filter) {
    this.setState({ filter })
  },

  handleChange (event) {
    this.setFilteredValue(event.target.value)
  },

  render () {
    const { people } = this.props
    if (!people) return null

    const peopleElements = people.filter(p => contains(p.name.toLowerCase(), this.state.filter))
                                 .sortBy(p => p.name.toLowerCase())
                                 .map((person, i) => {
                                   return <h3 className="nickname" key={i}>{person.name}</h3>
                                 })

    return (
      <div className="people-list">
        <div className="scrolling-panel">
          <input type="search"
                 placeholder="search..."
                 className="people-search-field"
                 autoFocus
                 onChange={this.handleChange} />
          {peopleElements}
        </div>
      </div>
    )
  }
})

export default PeopleList
