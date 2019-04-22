import React, { Component } from 'react';
import { Tab, Card, Segment, Header, Container } from 'semantic-ui-react';

const panes = [
    { menuItem: 'EU4 Tarihi', render: () =>
    <Container textAlign='justified' color='teal'>
      <p>Türkiye Strateji Oyuncuları Topluluğu Europa Universalis 4 Tarihi oyun kurallarıdır. Ülke başvurularının alınması, ülkelerin dağıtılması, oyun süresince aşağıda belirtilen kuralların uygulanması, kazananların ilanı ve yaptırım uygulama yetki ve sorumlulukları <b>Oyun Yöneticisi(GM)</b>'ndedir.</p>
      <Header as='h3' dividing color='olive' content='Genel Kurallar'/>
      <p>İlk <b>3</b> idea'da Military, Administrative ve Diplomatic idea alınmalıdır.</p>
      <p>İlk <b>1</b> ay oyunculara karşı agresif hareket yapılamaz.</p>
      <p>Toprak satmak yasaktır.</p>
      <p>Oyuncular, bir başka oyuncunun <b>vassal</b>'ı olamazlar.</p>
      <p>Savaş sonunda vassal olan oyuncu, ateşkes bitimini takip eden 2 yıl içerisinde bağımsızlık savaşı açmalı, ya da oyundan ayrılmalıdır.</p>
      <Header as='h3' dividing color='teal' content='Diplomatik Kurallar'/>
      <p>Birbiri ile <b>Victory Card</b>'ı olan veya <b>rival</b> durumdaki ülkeler birbirlerine para yardımı yapamaz ve dostane ilişkiler kuramazlar.</p>
      <p>Toprak bağı olmayan ve <b>Great Power</b> ülkelere garanti atılamaz.</p>
      <p>Oyuncuların 4 diplomatik ilişki puanı vardır ve saldıran taraf oldukları savaşlara sadece 1 müttefiklerini çağırabilirler.</p>
      <p>Garanti, Enforce, Condo ve Support atabilmek için Diplomacy puanın olması gereklidir.</p>
      <Header as='h3' dividing color='yellow' content='Oyun Açıkları ve Hileler'/>
      <p>Oyunun açıklarından fayda elde etmek veya bilerek ve isteyerek ülkesini ekonomik, askeri veya siyasi yönden bölge devletlerinin politikalarını etkileyecek ölçekte yıkıma uğratmak kesinlikle yasaktır.
        Farkedildiğinde oyuncunun mevcut ve sonraki oyunlarda uzaklaştırma alabilir, topluluktan çıkarılabilir veya oyun yöneticisinin belirleyeceği farklı yaptırımlara maruz kalabilir.</p>
      <p>Aynı savaşta olmayan birinin gemilerini başka bir savaşta avantaj sağlamak için kullanmak yasaktır.</p>
      <p>Prusya sadece kültür değişimi gerektirmeyen ülkelerce kurulabilir.</p>
      <p>Garanti, Enforce, Condo ve Support atabilmek için Diplomacy puanın olması gereklidir.</p>
      <Header as='h3' dividing color='violet' content='Özel Kurallar'/>
      <p>Osmanlı 1550'ye kadar sadece 1 Ally alabilir.</p>
      <p>Osmanlı, müttefiği hariç farklı dinden ülkelerin diplomasisine tarafsız kalmalıdır.</p>
      <p>500+ development ülkeler başka ülkelere <b>Tributary</b> olamazlar.</p>
      <p>500+ development ülkeler 5 yıl içerisinde HRE'den çıkmak zorundalardır. <i>İmparator dahil değil, 5 yıl içerisinde oy çokluğunu tekrar elde eden eski imparator, oy çokluğu onda olduğu sürece HRE'de kalabilir.</i></p>
      <Header as='h3' dividing color='orange' content='Savaş Kuralları'/>
      <p>İşgal edilmemiş topraklar, barış anlaşmasında talep edilemezler.</p>
      <p>30 savaş skorundan fazla skor isteyen ülkeler özgür bırakılamaz.</p>
      <p>Savaşta -90% ile kaybeden savaş lideri oyuncu güvercin çıkmasa dahi 75 savaş skoruna kadar tüm anlaşmaları kabul etmek zorundadır. <i>Savaş skorunun 1 yıldan fazla süre ile +90% üzeri olması gerekir</i></p>
      <p>Statik hale gelmiş, 10 yıldır savaş skorunun el değiştirmediği savaşlarda, <i>Süre wargoal'un 1 yıl süre el değiştirmesi ile resetlenir</i></p>
    </Container>
    }, { menuItem: 'EU4 Özel', render: () =>
    <Container textAlign='justified' color='teal'>
      <p>Türkiye Strateji Oyuncuları Topluluğu Europa Universalis 4 Özel oyun kurallarıdır. Ülke başvurularının alınması, ülkelerin dağıtılması, oyun süresince aşağıda belirtilen kuralların uygulanması, kazananların ilanı ve yaptırım uygulama yetki ve sorumlulukları <b>Oyun Yöneticisi(GM)</b>'ndedir.</p>
      <Header as='h3' dividing color='olive' content='Genel Kurallar'/>
      <p>Oyuncular arası diplomatik ilişkilerin tamamı yasaktır.</p>
      <p>1550 yılına kadar bir adet ai ally alınabilir. Bu müttefik de saldırı savaşlarına çağırılamaz</p>
      <p>Tüm ülkeler, 150 puan sınırı ile kurulmalıdır. Toprak bütünlüğüne dikkat edilmelidir.</p>
      <p>Halihazırda savaşan iki oyuncu, saldırma korumasına alınırlar. Savaş devam ettiği sürece bir başka oyuncu bu türdeki savaşlara müdahil olamaz.</p>
      <p>İlk <b>3</b> idea'da Military, Administrative ve Diplomatic idea alınmalıdır.</p>
      <Header as='h3' dividing color='red' content='Anlaşma Kuralları'/>
      <p>30 savaş skorundan fazla skor isteyen ülkeler özgür bırakılamaz</p>
      <p>Savaşta -90% ile kaybeden savaş lideri oyuncu güvercin çıkmasa dahi 75 savaş skoruna kadar tüm anlaşmaları kabul etmek zorundadır. <i>Savaş skorunun 1 yıldan fazla süre ile +90% üzeri olması gerekir</i></p>
      <p>Oyuncu savaşlarında, savaşan taraflardan biri kayıtsız teslim olmuş ise, barış yapmak üzere Oyun Yöneticisi'nden (GM) izin alınarak oyun durdurulabilir.</p>
    </Container>
    }, { menuItem: 'HOI4', render: () =>
    <Container textAlign='justified' color='teal'>
      <p>Türkiye Strateji Oyuncuları Topluluğu Hearts of Iron 4 oyun kurallarıdır. Ülke başvurularının alınması, ülkelerin dağıtılması, oyun süresince aşağıda belirtilen kuralların uygulanması, kazananların ilanı ve yaptırım uygulama yetki ve sorumlulukları <b>Oyun Yöneticisi(GM)</b>'ndedir.</p>
      <Header as='h3' dividing color='olive' content='Genel Kurallar'/>
      Hazırlanıyor..
    </Container>
    }, { menuItem: 'CIV6', render: () =>
    <Container textAlign='justified' color='teal'>
      <p>Türkiye Strateji Oyuncuları Topluluğu Civilization 6 oyun kurallarıdır. Ülke başvurularının alınması, ülkelerin dağıtılması, oyun süresince aşağıda belirtilen kuralların uygulanması, kazananların ilanı ve yaptırım uygulama yetki ve sorumlulukları <b>Oyun Yöneticisi(GM)</b>'ndedir.</p>
      <Header as='h3' dividing color='olive' content='Genel Kurallar'/>
      Hazırlanıyor..
    </Container>
    }
]

export default class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Segment className='page' raised color='teal'>
        <Header as='h3' dividing color='teal' content='Oyun Kuralları'/>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
      </Segment>
    );
  }
}
