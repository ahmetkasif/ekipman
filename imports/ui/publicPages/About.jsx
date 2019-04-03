import React, { Component } from 'react';
import { Divider, Header, List, Card } from 'semantic-ui-react';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="profile">
        <Card.Content header={
          <div className="profileTop">
            <Header as='h4'>
              <Header.Content>
                Hakkında
              </Header.Content>
            </Header>
          </div>
        }/>
        <Card.Content>
          Türk Strateji Oyuncuları Topluluğu (TSOT) resmi web uygulamasıdır.
          <Divider />
          <List bulleted size={'large'}>
            <List.Item>Uygulama içi özelliklere, kayıt olarak ulaşılabilmektedir</List.Item>
            <List.Item>
              İşlevsel olarak eklenmesi tamamlanmış özellikler
              <List.List>
                <List.Item>Mevcut oyunları listeleyebilme</List.Item>
                <List.Item>Oyun ekleyebilme</List.Item>
                <List.Item>Oyun bilgilerini güncelleyebilme</List.Item>
                <List.Item>Oyun detaylarını görüntüleyebilme</List.Item>
                <List.Item>Profil sayfası</List.Item>
                <List.Item>Kullanıcı şifresini güncelleyebilme</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Tasarımsal olarak eklenmesi tamamlanmış özellikler
              <List.List>
                <List.Item>Liderler Tablosu</List.Item>
                <List.Item>Oyunlara kayıt olan oyuncuların listelenmesi</List.Item>
              </List.List>
            </List.Item>
          </List>
          <Divider />
          Sorularınız, görüşleriniz ve hata bildirimi için, <b>noreply@tsotapp.com</b> adresine e-posta ile ulaşabilirsiniz.
          <Divider />
          <b>UYGULAMA GELİŞTİRİLMEKTEDİR. ÇOĞU ÖZELLİK, HENÜZ EKLENMEMİŞTİR. TASARIMSAL DEMO AMAÇLI GÖSTERİME SUNULMUŞTUR.</b>
          <Divider />
          <img className="ui medium centered rounded image" src='/logo.png' />
        </Card.Content>
      </Card>
    );
  }
}
