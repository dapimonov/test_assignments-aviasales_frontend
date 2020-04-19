import React, { Component } from 'react';
import './Tabs.scss';


class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.initial,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick = (event) => {
    this.setState({
      ...this.state,
      selected: event.target.id,
    });
    this.props.setSorter(event.target.id);
  };

  render() {
    return (
      <div className='tabs'>
        <div
          className='column left'
          id='cheapest'
          isactive={String(this.state.selected === 'cheapest')}
          onClick={this.onClick}
        >
          Самый дешевый
        </div>
        <div
          className='column right'
          id='fastest'
          isactive={String(this.state.selected === 'fastest')}
          onClick={this.onClick}
        >
          Самый быстрый
        </div>
      </div>
    )
  }
}

export default Tabs;
