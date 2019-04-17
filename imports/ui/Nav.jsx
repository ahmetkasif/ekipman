import React, { Component } from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home'
    };

    this.handleRoute = this.handleRoute.bind(this);
  }

  componentDidMount(){
    if(this.props.match.path){
      if(this.props.match.path == '/'){
        this.setState({
          activeItem: 'home'
        });
      } else {
        this.setState({
          activeItem: this.props.match.path.slice(1)
        });
      }
    }
  }

  handleRoute(targetRoute, name){
    if (targetRoute !== this.props.location.pathname) {
      this.props.history.push(targetRoute);
      this.setState({
        activeItem: name 
      });
    }
  }

  render() {
    return (
      <Menu pointing stackable color='teal'>
        <Menu.Item>
          <img src='/images/logo.png' />
        </Menu.Item>
        <Menu.Item
          name='Anasayfa'
          active={this.state.activeItem === 'home'}
          onClick={() => this.handleRoute('/', 'home')}>
            Anasayfa
        </Menu.Item>
        {Meteor.userId() ?
          <Menu.Item
            name='Oyunlar'
            active={this.state.activeItem === 'games'}
            onClick={() => this.handleRoute('/games', 'games')}>
              Oyunlar
          </Menu.Item>
        : ""}
        <Menu.Item
          name='Lider Tablosu'
          active={this.state.activeItem === 'leaderboard'}
          onClick={() => this.handleRoute('/leaderboard', 'leaderboard')}>
            Liderler Tablosu
        </Menu.Item>
        {Meteor.userId() ?
          <Menu.Item
            name='Kurallar'
            active={this.state.activeItem === 'rules'}
            onClick={() => this.handleRoute('/rules', 'rules')}>
              Oyun Kuralları
          </Menu.Item>:
        ''}
        {Meteor.userId() ?
          <Menu.Item
            name='DLC-Mod Linkleri'
            active={this.state.activeItem === 'links'}
            onClick={() => this.handleRoute('/links', 'links')}>
              S.S.S
          </Menu.Item>:
        ''}
        {Meteor.userId() ?
          <Menu.Menu position='right'>
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
