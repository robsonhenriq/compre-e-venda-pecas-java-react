import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Carrinho from './carrinho';
import CarrinhoDetail from './carrinho-detail';
import CarrinhoUpdate from './carrinho-update';
import CarrinhoDeleteDialog from './carrinho-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarrinhoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarrinhoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarrinhoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Carrinho} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CarrinhoDeleteDialog} />
  </>
);

export default Routes;
