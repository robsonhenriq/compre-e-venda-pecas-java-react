import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Vendedor from './vendedor';
import VendedorDetail from './vendedor-detail';
import VendedorUpdate from './vendedor-update';
import VendedorDeleteDialog from './vendedor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VendedorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VendedorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VendedorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Vendedor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VendedorDeleteDialog} />
  </>
);

export default Routes;
