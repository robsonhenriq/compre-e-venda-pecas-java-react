import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ModoPagamento from './modo-pagamento';
import ModoPagamentoDetail from './modo-pagamento-detail';
import ModoPagamentoUpdate from './modo-pagamento-update';
import ModoPagamentoDeleteDialog from './modo-pagamento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ModoPagamentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ModoPagamentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ModoPagamentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ModoPagamento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ModoPagamentoDeleteDialog} />
  </>
);

export default Routes;
