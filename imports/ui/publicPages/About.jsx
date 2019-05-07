import React, { Component } from 'react';
import { List, Image, Segment, Divider, Header, Grid, Button } from 'semantic-ui-react';

export default class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Segment className='page' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Hakkında'/>
        Türk Strateji Oyuncuları Topluluğu (TSOT) resmi web uygulamasıdır.
        <Divider/>
        <Image className="generated" size='medium' src='/images/logo.png' />
        {!Meteor.userId() ? <Button size='huge' color='teal' onClick={() => this.handleRoute('/login')} className="homeSignButton" >Giriş Yap</Button> : null}
        <Divider />
        <List bulleted size={'large'}>
          <List.Item>Uygulama içi özelliklere, kayıt olarak ulaşılabilmektedir</List.Item>
          <List.Item>Kullanıcı profil fotoğrafları gravatar üzerinden çekilmektedir. <a href="https://en.gravatar.com/">en.gravatar.com</a> adresine bir profil fotoğrafı yükleyerek uygulamadaki profil fotoğrafınızı güncel tutabilirsiniz.</List.Item>
          <List.Item>
            İşlevsel olarak eklenmesi tamamlanmış özellikler
            <List.List>
              <List.Item>Mevcut oyunları listeleyebilme</List.Item>
              <List.Item>Oyun ekleyebilme, silme</List.Item>
              <List.Item>Oyun bilgilerini güncelleyebilme</List.Item>
              <List.Item>Oyun detaylarını görüntüleyebilme</List.Item>
              <List.Item>Kullanıcı şifresini güncelleyebilme</List.Item>
              <List.Item>Oyunlara kayıt olabilme / oyundan ayrılabilme</List.Item>
              <List.Item>Oyunlara kayıt olan oyuncuların listelenmesi</List.Item>
            </List.List>
          </List.Item>
          <List.Item>
            Tasarımsal olarak eklenmesi tamamlanmış özellikler
            <List.List>
              <List.Item>Liderler Tablosu</List.Item>
              <List.Item>Oyun kurallarını görüntüleyebilme</List.Item>
              <List.Item>Oyun dlc-mod kurulum anlatımlarına erişim</List.Item>
              <List.Item>Lobideki açık oyunlardaki mevcut oyuncu sayısı</List.Item>
              <List.Item>Profil sayfası</List.Item>
            </List.List>
          </List.Item>
        </List>
        <Divider />
        Sorularınız, görüşleriniz ve hata bildirimi için, <b>noreply@tsotapp.com</b> adresine e-posta ile ulaşabilirsiniz.
        <Divider />
        <b>UYGULAMA GELİŞTİRME AŞAMASINDADIR. ÇOĞU ÖZELLİK, HENÜZ TASARIM AŞAMASINDADIR. GELİŞİM SÜRECİNİ HAKKINDA SAYFASINDAN TAKİP EDEBİLİRSİNiZ.</b>
      </Segment>
    );
  }
}
