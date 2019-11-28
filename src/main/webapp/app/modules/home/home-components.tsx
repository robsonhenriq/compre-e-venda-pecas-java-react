import React, { Fragment } from 'react';
// import { Translate } from 'react-jhipster';

import { UncontrolledCarousel, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, RouteComponentProps } from 'react-router-dom';
// import { NavLink as Link } from 'react-router-dom';

// import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import appConfig from 'app/config/constants';

const itensCarrousel = [
  {
    src:
      'https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLB-ReformeSuaCasa/cde31e80-e557-11e9-932f-f3621fc03752-home-slider_desktop.jpg',
    // altText: 'Slide 1',
    // caption: 'Slide 1',
    // header: 'Slide 1 Header',
    key: '1'
  },
  {
    src:
      'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mlb-home-desktop-slider-picture-4ffa980e-1a46-4816-bb74-ab2cdd27f5f7.jpg',
    // altText: 'Slide 2',
    // caption: 'Slide 2',
    // header: 'Slide 2 Header',
    key: '2'
  },
  {
    src:
      'https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mlb-home-desktop-slider-picture-9d7b597f-28d4-4d8a-af73-650e0a8efb59.jpg',
    // altText: 'Slide 3',
    // caption: 'Slide 3',
    // header: 'Slide 3 Header',
    key: '3'
  }
];

export const CarrouselProdutos = () => <UncontrolledCarousel items={itensCarrousel} />;

// CardDeProdutos para ser mostrado na tela HOME
export const CardProdutos = props => (
  // return (
  <Fragment>
    <Card className="col-4 col-md-4 col-lg-4">
      <CardImg
        top
        width="318px"
        height="180px"
        src={`data:${props.listFoto[0].imagemContentType};base64,${props.listFoto[0].imagem}`}
        alt="Foto do produto"
      />

      <CardBody>
        <CardTitle>
          <b>Produto:</b> {props.title}
        </CardTitle>

        {props.marca && (
          <CardSubtitle>
            <b>Marca:</b> {props.marca}
          </CardSubtitle>
        )}

        <CardText>
          <div>
            <b>Preço Á Vista R$:</b> {props.precoAVista}
          </div>

          <hr />

          {/* BTN adicionar produto no carrinho */}
          <div className="d-flex justify-content-center">
            {/* <a className="btn btn-success btn-sm ml-12 " href="carrinho.html"> */}
            {/* <a tag={Link} to={`entity/carrinho`} className="btn btn-success btn-sm ml-12 "> */}
            <Button tag={Link} to={`entity/carrinho`} className="btn btn-success btn-sm ml-12 " size="sm">
              <span className="btn btn-success btn-sm ml-6" id="spanAdicionarProdutoCarrinho">
                Adicionar ao carrinho <FontAwesomeIcon icon={faShoppingCart} />
              </span>
              {/* </a> */}
            </Button>
          </div>
        </CardText>
      </CardBody>
    </Card>
  </Fragment>
  // );
);

// ======================== APAGAR ============================
// export const BrandIcon = props => (
//   <div {...props} className="brand-icon">
//     <img src="content/images/logo-jhipster.png" alt="Logo" />
//   </div>
// );

// export const Brand = props => (
//   <NavbarBrand tag={Link} to="/" className="brand-logo">
//     <BrandIcon />
//     <span className="brand-title">
//       <Translate contentKey="global.title">Ecommerce</Translate>
//     </span>
//     <span className="navbar-version">{appConfig.VERSION}</span>
//   </NavbarBrand>
// );

// export const Home = props => (
//   <NavItem>
//     <NavLink tag={Link} to="/" className="d-flex align-items-center">
//       <FontAwesomeIcon icon="home" />
//       <span>
//         <Translate contentKey="global.menu.home">Home</Translate>
//       </span>
//     </NavLink>
//   </NavItem>
// );

// export const BuscarProduto = props => (
//   <NavItem>
//     <form className="form-inline my-3 my-lg-0" action="resultadoProdutos.html">
//       <div className="input-group input-group-sm">
//         <input type="text" className="form-control" placeholder="Buscar produto..." />
//         <div className="input-group-append">
//           <button type="submit" className="btn btn-secondary btn-number">
//             <FontAwesomeIcon icon={faSearch} />
//           </button>
//         </div>
//       </div>
//     </form>
//   </NavItem>
// );

// export const Carrinho = props => (
//   <NavItem>
//     <a className="btn btn-success btn-sm ml-3" href="carrinho.html">
//       <FontAwesomeIcon icon={faShoppingCart} />
//       <span className="badge badge-light" id="quantidadeItens">
//         0
//       </span>
//     </a>
//   </NavItem>
// );
