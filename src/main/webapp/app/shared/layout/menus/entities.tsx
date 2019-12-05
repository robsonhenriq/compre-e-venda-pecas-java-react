import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/avaliacao">
      <Translate contentKey="global.menu.entities.avaliacao" />
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/entity/carrinho">
      <Translate contentKey="global.menu.entities.carrinho" />
    </MenuItem> */}
    {/* <MenuItem icon="asterisk" to="/entity/cliente">
      <Translate contentKey="global.menu.entities.cliente" />
    </MenuItem> */}
    <MenuItem icon="asterisk" to="/entity/endereco">
      <Translate contentKey="global.menu.entities.endereco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/foto">
      <Translate contentKey="global.menu.entities.foto" />
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/entity/item">
      <Translate contentKey="global.menu.entities.item" />
    </MenuItem> */}
    <MenuItem icon="asterisk" to="/entity/marca">
      <Translate contentKey="global.menu.entities.marca" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/modo-pagamento">
      <Translate contentKey="global.menu.entities.modoPagamento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/produto">
      <Translate contentKey="global.menu.entities.produto" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/veiculo">
      <Translate contentKey="global.menu.entities.veiculo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/venda">
      <Translate contentKey="global.menu.entities.venda" />
    </MenuItem>
    {/* <MenuItem icon="asterisk" to="/entity/vendedor">
      <Translate contentKey="global.menu.entities.vendedor" />
    </MenuItem> */}
  </NavDropdown>
);
