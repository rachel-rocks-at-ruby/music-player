import React from 'react'
import { shallow } from 'enzyme'

import App from 'components/App'
import PlayerContainer from 'components/PlayerContainer'

// Enzyme render test docs: https://airbnb.io/enzyme/docs/api
describe('<App />', () => {
  it('renders the component', () => {
    const app = shallow(<App />)

    expect(app.exists()).to.equal(true)
  })
})

describe('<PlayerContainer />', () => {
  it('renders the player container', () => {
    const wrapper = shallow(<PlayerContainer />)

    expect(wrapper.exists('div.container')).to.equal(true)
    expect(wrapper.find('div.container')).to.have.lengthOf(1)
  })
})
