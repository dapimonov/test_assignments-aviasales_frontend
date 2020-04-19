import React, {Component} from 'react';
import './App.scss';
import { ReactComponent as Logo } from '../../svgs/logo.svg';
import Filter from "../../components/FIlter/Filter";
import Tabs from "../../components/Tabs/Tabs";
import Ticket from "../../components/Ticket/Ticket";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sorter: 'cheapest',
      filters: this.props.filterOptions.reduce((last, current) => {return {...last, [current.value]: true}}, {}),
    };

    this.handleTabs = this.handleTabs.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleTabs = (type) => {
    this.setState({
      ...this.state,
      sorter: type,
    });
  };

  handleFilter = (filters) => {
    this.setState({
      ...this.state,
      filters: filters,
    });
  };

  render() {
    let {filters, sorter} = this.state;
    let {tickets, filterOptions} = this.props;
    tickets = tickets.filter((ticket) => filters[ticket.segments[0].stops.length] && filters[ticket.segments[1].stops.length]);
    switch (this.state.sorter) {
      case 'cheapest':
        tickets.sort((a, b) => a.price - b.price);
        break;
      case 'fastest':
        tickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration);
        break;
      default:
        tickets.sort((a, b) => a.price - b.price);
    }

    return (
      <div className="App clearfix">
        <div className='wrapper logoWrapper'>
          <Logo className='logo' />
        </div>
        <div className='wrapper filterWrapper'>
          <Filter setFilters={this.handleFilter} filterOptions={filterOptions}/>
        </div>
        <div className='wrapper ticketsWrapper'>
          <Tabs setSorter={this.handleTabs} initial={sorter}/>
          {
            tickets.map((ticket, index) =>
              <Ticket key={'_ticket_'+index} ticket={ticket}/>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
