import React, { Component } from 'react';
import './Filter.scss';


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.filterOptions.reduce((last, current) => {return {...last, [current.value]: true}}, {}),
      all: true,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.selected !== this.state.selected) {
      this.props.setFilters(this.state.selected);
    }
  }

  onChange = (event) => {
    if (event.target.value === 'all') {
      switch (this.state.all) {
        case true:
          this.setState({
            ...this.state,
            all: false,
            selected: Object.keys(this.state.selected).reduce((last, current) => {
              return {...last, [current]: false}
            }, {}),
          });
          break;
        case false:
          this.setState({
            ...this.state,
            all: true,
            selected: Object.keys(this.state.selected).reduce((last, current) => {
              return {...last, [current]: true}
            }, {}),
          });
          break;
        default:
          break;
      }
    }
    else {
      if (this.state.all) {
        this.setState({
          ...this.state,
          all: false,
          selected: {
            ...this.state.selected,
            [event.target.value]: !this.state.selected[event.target.value],
          },
        });
      }
      else {
        let isLast = Object.values(this.state.selected).filter((item) => item === true).length === Object.keys(this.state.selected).length - 1;
        if (!this.state.selected[event.target.value] && Object.keys(this.state.selected) && isLast) {
          this.setState({
            ...this.state,
            all: true,
            selected: {
              ...this.state.selected,
              [event.target.value]: !this.state.selected[event.target.value],
            },
          });
        }
        else {
          this.setState({
            ...this.state,
            selected: {
              ...this.state.selected,
              [event.target.value]: !this.state.selected[event.target.value],
            },
          });
        }
      }
    }
  };

  render() {
    return (
      <div className='filter'>
        <span className='header-span'>Количество пересадок</span>
        <ul>
          <li key='all'>
            <label>
              <input
                type="checkbox"
                value='all'
                onChange={this.onChange}
                checked={this.state.all}
              />
              <span className='label-span' />Все
            </label>
          </li>
          {
            this.props.filterOptions.map((item) =>
              <li key={item.value}>
                <label>
                  <input
                    type="checkbox"
                    value={item.value}
                    onChange={this.onChange}
                    checked={this.state.selected[item.value]}
                  />
                  <span className='label-span' />{item.label}
                </label>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}


export default Filter;
