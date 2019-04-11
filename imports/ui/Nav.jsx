import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.handleRoute = this.handleRoute.bind(this);
  }

  state = {}

  handleRoute(targetRoute){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
    }
  }

  render() {
    return (
      <Menu stackable className="navContainer">
        <Menu.Item className="generated">
          <img src='/logo.png' />
        </Menu.Item>
        <Menu.Item
          name='Anasayfa'
          className="navButton"
          onClick={() => this.handleRoute('/')}>
            Anasayfa
        </Menu.Item>
        {Meteor.userId() ?
          <Menu.Item
            name='Oyunlar'
            className="navButton"
            onClick={() => this.handleRoute('/games')}>
              Oyunlar
          </Menu.Item>
        : ""}
        <Menu.Item
          name='Lider Tablosu'
          className="navButton"
          onClick={() => this.handleRoute('/leaderboard')}>
            Liderler Tablosu
        </Menu.Item>
        {Meteor.userId() ?
          <Menu.Item
            name='Kurallar'
            className="navButton"
            onClick={() => this.handleRoute('/rules')}>
              Oyun Kuralları
          </Menu.Item>:
        ''}
        {Meteor.userId() ?
          <Menu.Item
            name='DLC-Mod Linkleri'
            className="navButton"
            onClick={() => this.handleRoute('/links')}>
              DLC-Mod Linkleri
          </Menu.Item>:
        ''}
        {Meteor.userId() ?
          <Menu.Menu position='right'>
            <Menu.Item position='right'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Başlayın...' />
                <i className='fa fa-search' />
              </div>
              <div className='results' />
            </Menu.Item>
            <Dropdown item text='Seçenekler'>
              <Dropdown.Menu>
                <Dropdown.Item text='Profil' onClick={() => this.props.history.push('/profile/' + Meteor.users.findOne(Meteor.userId()).username, {username: Meteor.users.findOne(Meteor.userId()).username})}/>
                <Dropdown.Item text='Yeni Oyun' onClick={() => this.handleRoute('/newGame')}/>
                <Dropdown.Item text='Hesap Ayarları' onClick={() => this.handleRoute('/settings')}/>
                <Dropdown.Item text='Çıkış Yap' onClick={() => Meteor.logout(() => this.props.history.push('/'))}/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          :
          <Menu.Menu position='right'>
            <Menu.Item position='right'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Başlayın...' />
                <i className='fa fa-search' />
              </div>
              <div className='results' />
            </Menu.Item>
            <Menu.Item
              position='right'
              name='Giriş Yap'
              onClick={() => this.handleRoute('/login')}>
                Giriş Yap
            </Menu.Item>
          </Menu.Menu>
        }
      </Menu>
    )
  }
}
