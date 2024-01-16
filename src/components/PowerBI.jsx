import React, { Component } from 'react';
import pw1 from "../assets/pw3.png"
import pw2 from "../assets/pw2.png"
import pw3 from "../assets/pw1.png"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: pw1,
    altText: '',
    caption: 'Análise de Ações Microsoft e Apple'
  },
  {
    src:pw2,
    altText: 'Relatório de Vendas',
    caption: 'Relatório de Vendas'
  },
  {
    src: pw3,
    altText: 'Slide 3',
    caption: 'Relatório de Vendas'
  }
];

class PowerBI extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  
  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption  captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (<>
        
    <section  id='techsSection'>
    <div className="container">
<h1 className='TitleTechs'>Habilidade com Data Science</h1>

<p className='txtTechs'>
    Além da programação, recentemente tenho me aventurado na área de Data Science, com foco em PowerBI Desktop, onde analiso dados e desenvolvo dashboards. Em seguida estão alguns de meus projetos pessoais.
</p>
</div>
<div id="carrossel">
    
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
</div>
      
</section>
      </>
    );
  }
}
        

export default PowerBI;