import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Noty from 'noty';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));

  Accounts.onLogin(function() {
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Giriş yapıldı',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  });

  Accounts.onLogout(function() {
    new Noty({
      type: 'information',
      layout: 'topRight',
      theme: 'sunset',
      text: 'Çıkış yapıldı',
      timeout: 1000,
      progressBar: true,
      closeWith: ['click', 'button'],
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      }
    }).show();
  });
});
