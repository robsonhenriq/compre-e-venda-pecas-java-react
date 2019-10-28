import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">Ecommerce</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const BuscarProduto = props => (
  <NavItem>
    <form className="form-inline my-3 my-lg-0" action="resultadoProdutos.html">
      <div className="input-group input-group-sm">
        <input type="text" className="form-control" placeholder="Buscar produto..." />
        <div className="input-group-append">
          <button type="submit" className="btn btn-secondary btn-number">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </form>
  </NavItem>
);

export const Carrinho = props => (
  <NavItem>
    <a className="btn btn-success btn-sm ml-3" href="carrinho.html">
      <FontAwesomeIcon icon={faShoppingCart} />
      <span className="badge badge-light" id="quantidadeItens">
        0
      </span>
    </a>
  </NavItem>
);
