import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Veiculo from './veiculo';
import VeiculoDetail from './veiculo-detail';
import VeiculoUpdate from './veiculo-update';
import VeiculoDeleteDialog from './veiculo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VeiculoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VeiculoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VeiculoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Veiculo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VeiculoDeleteDialog} />
  </>
);

export default Routes;
