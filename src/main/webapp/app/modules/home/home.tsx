import './home.scss';

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getProdutos } from '../../entities/produto/produto.reducer';
import { createEntity as saveItem } from 'app/entities/item/item.reducer';
import { createEntity as saveCarrinhoItem } from 'app/entities/carrinho/carrinho.reducer';

import { isListNull, isObjectNull } from 'app/shared/util/verificacoes-utils';
// import { CarrouselProdutos, CardProdutos } from './home-components';
import { CarrouselProdutos } from './home-components';
import { CardProdutos } from './CardProdutos';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
    this.props.getProdutos();
  }

  render() {
    const { account, produtos } = this.props;
    // const finalProdutos = produtos.map(p => <CardProdutos produto={p}/>)

    return (
      <Fragment>
        {/* <CarrouselProdutos /> */}

        <h1> Últimos produtos </h1>
        <hr />

        <Row>
          {/* {produtos.map(p => <CardProdutos produto={p}/>)} */}
          {produtos.map((p, idx) => (
            <Fragment>
              <CardProdutos
                produtoEntity={p}
                saveItem={this.props.saveItem}
                saveCarrinhoItem={this.props.saveCarrinhoItem}
                user={account}
              />
              {/* // key={idx}
              // id={p.id}
              // listFoto={isListNull(p.listFotos)}
              // title={p.descricao}
              // marca={isObjectNull(p.marca).nome}
              // precoAVista={p.precoAVista}
              // produtoEntity={p}
              // /> */}
            </Fragment>
          ))}
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = (storeState: IRootState) => ({
  // const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  produtos: storeState.produto.entities
});

const mapDispatchToProps = { getSession, getProdutos, saveItem, saveCarrinhoItem };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
