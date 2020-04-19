import React, { Component } from 'react';
import moment from 'moment';
import './Ticket.scss';


class Ticket extends Component {
  constructor(props) {
    super(props);

    this.stopsWordForm = this.stopsWordForm.bind(this);
    this.calculateDuration = this.calculateDuration.bind(this);
  }

  stopsWordForm = (number) => {
    const lastCharacter = number.toString().slice(-1);
    if (lastCharacter === '1') {
      return 'Пересадка'
    }
    else if (lastCharacter === '2' || lastCharacter === '3' || lastCharacter === '4') {
      return 'Пересадки'
    }
    else {
      return 'Пересадок'
    }
  };

  calculateDuration = (number) => {
    const minutes = number % 60;
    const hours = (number - minutes) / 60;

    return `${hours}ч ${minutes}м`
  };

  render() {
    const ticket = this.props.ticket;

    return (
      <div className='ticket'>
        <div className='row top'>
          <div className='column'>
            <span className='price'>{ticket.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' Р'}</span>
          </div>
          <div className='column'/>
          <div className='column'>
            <img className='carrier-image' src={`//pics.avs.io/110/36/${ticket.carrier}.png`} alt={ticket.carrier} />
          </div>
        </div>
        <div className='row bottom'>
          <div className='column'>
            <p className='grey-text'>{ticket.segments[0].origin + ' - ' + ticket.segments[0].destination}</p>
            <p className='black-text'>{moment(ticket.segments[0].date).format('HH:mm') + ' - ' + moment(ticket.segments[0].date).add(ticket.segments[0].duration, 'm').format('HH:mm')}</p>
            <p className='grey-text'>{ticket.segments[1].origin + ' - ' + ticket.segments[1].destination}</p>
            <p className='black-text'>{moment(ticket.segments[1].date).format('HH:mm') + ' - ' + moment(ticket.segments[1].date).add(ticket.segments[1].duration, 'm').format('HH:mm')}</p>
          </div>
          <div className='column'>
            <p className='grey-text'>В пути</p>
            <p className='black-text'>{this.calculateDuration(ticket.segments[0].duration)}</p>
            <p className='grey-text'>В пути</p>
            <p className='black-text'>{this.calculateDuration(ticket.segments[1].duration)}</p>
          </div>
          <div className='column'>
            <p className='grey-text'>{ticket.segments[0].stops.length + ' ' + this.stopsWordForm(ticket.segments[0].stops.length)}</p>
            <p className='black-text'>{ticket.segments[0].stops.length ? ticket.segments[0].stops.join(', ') : '-'}</p>
            <p className='grey-text'>{ticket.segments[1].stops.length + ' ' + this.stopsWordForm(ticket.segments[1].stops.length)}</p>
            <p className='black-text'>{ticket.segments[1].stops.length ? ticket.segments[1].stops.join(', ') : '-'}</p>
          </div>
        </div>
      </div>
    )
  }
}


export default Ticket;
