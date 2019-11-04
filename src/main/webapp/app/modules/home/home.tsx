import './home.scss';

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import { CarrouselProdutos, CardProdutos } from './home-components';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Fragment>
        <CarrouselProdutos />

        <h1> Últimos Produtos</h1>
        <Row>
          <CardProdutos />
          <CardProdutos />
          <CardProdutos />
        </Row>

        <h1> Mais Vendidos </h1>
        <Row>
          <CardProdutos />
          <CardProdutos />
          <CardProdutos />
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
