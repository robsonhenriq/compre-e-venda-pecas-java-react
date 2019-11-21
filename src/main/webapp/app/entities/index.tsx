import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Avaliacao from './avaliacao';
import Carrinho from './carrinho';
import Cliente from './cliente';
import Endereco from './endereco';
import Foto from './foto';
import Item from './item';
import Marca from './marca';
import ModoPagamento from './modo-pagamento';
import Produto from './produto';
import Veiculo from './veiculo';
import Venda from './venda';
import Vendedor from './vendedor';
/* add-route-import - will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/avaliacao`} component={Avaliacao} />
      <ErrorBoundaryRoute path={`${match.url}/carrinho`} component={Carrinho} />
      <ErrorBoundaryRoute path={`${match.url}/cliente`} component={Cliente} />
      <ErrorBoundaryRoute path={`${match.url}/endereco`} component={Endereco} />
      <ErrorBoundaryRoute path={`${match.url}/foto`} component={Foto} />
      <ErrorBoundaryRoute path={`${match.url}/item`} component={Item} />
      <ErrorBoundaryRoute path={`${match.url}/marca`} component={Marca} />
      <ErrorBoundaryRoute path={`${match.url}/modo-pagamento`} component={ModoPagamento} />
      <ErrorBoundaryRoute path={`${match.url}/produto`} component={Produto} />
      <ErrorBoundaryRoute path={`${match.url}/veiculo`} component={Veiculo} />
      <ErrorBoundaryRoute path={`${match.url}/venda`} component={Venda} />
      <ErrorBoundaryRoute path={`${match.url}/vendedor`} component={Vendedor} />
    </Switch>
  </div>
);

export default Routes;
