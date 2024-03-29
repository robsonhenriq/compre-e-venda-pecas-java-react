import './header.scss';

import React, { Fragment } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';

import { NavLink as Link, Route, RouteComponentProps } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, BuscarProduto, Carrinho } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

// ASSIM QUE IREI PASSAR O ID do USER ?

// export interface IHeaderProps extends RouteComponentProps<{ id: string }> {
//   // {
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   ribbonEnv: string;
//   isInProduction: boolean;
//   isSwaggerEnabled: boolean;
//   currentLocale: string;
//   onLocaleChange: Function;
//   // }
// }

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    return (
      <div id="app-header">
        {/* {this.renderDevRibbon()} */}
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="bg-dark">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              {/* COLOCAR AQUI UM DROPDOWN DE CATEGORIAS */}
              <Home />
              <BuscarProduto />

              {isAuthenticated && <EntitiesMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
              {/* ICONE do CARRINHO*/}
              {isAuthenticated && <Carrinho />}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
