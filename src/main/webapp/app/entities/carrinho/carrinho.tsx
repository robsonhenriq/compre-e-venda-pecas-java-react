import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity as getCarrinhoById } from './carrinho.reducer';
import { getEntity as getClienteById } from '../cliente/cliente.reducer';
import { getSession } from 'app/shared/reducers/authentication';
import { ICarrinho } from 'app/shared/model/carrinho.model';

export interface ICarrinhoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICarrinhoState = ICarrinho;

export class Carrinho extends React.Component<ICarrinhoProps, ICarrinhoState> {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  componentDidMount() {
    this.props.getClienteById(this.props.account.id);

    this.props.getSession();
    // this.props.getCarrinhoById(this.props.clienteEntity.carrinho.id);
    setTimeout(() => {
      // console.log('Antes do SET state ID = ' + this.state.id);
      this.setState({ id: this.props.clienteEntity.carrinho.id });
      this.props.getCarrinhoById(this.state.id);
      // console.log('DEPOIS state ID = ' + this.state.id);
      // this.props.getCarrinhoById(this.props.clienteEntity.carrinho.id);
    }, 1000);
  }

  render() {
    const { match, totalItems, clienteEntity, carrinhoEntity, account } = this.props;

    /* Caso o usuario do cliente ainda não esteja definido, irá "retornar", antes de redenrizar
     * a tela
     */
    if (!this.props.clienteEntity.usuario) return null;
    // if (!this.props.clienteEntity.carrinho.id) return null;
    if (!this.props.carrinhoEntity.listItens) return null;
    // if (!this.props.clienteEntity.carrinho.listItens) return null;

    return (
      <div>
        <h2 id="carrinho-heading">
          <Translate contentKey="ecommerceApp.carrinho.home.title">Carrinhos</Translate>
          {/* ========== VALORES DE TESTE ::::::: APAGAR ::::::: ================*/}
          ## ACCOUNT ID === {account.id}
          ## ACCOUNT EMAIL === {account.email}
          ## CLIENTE ID === {clienteEntity.id}
          ## CLIENTE CPF === {clienteEntity.cpf}
          {/* ## CLIENTE USER === {clienteEntity.usuario.id} */}
          ## CLIENTE CARRINHO === {clienteEntity.carrinho.id}
          {/* ## CLIENTE CARRINHO === {clienteEntity.carrinho.listItens[1].id} */}
          {/* ## CLIENTE USUER ID === {this.props.clienteEntity.usuario.id} */}
          {/* ## STATE ID DO CARRINHO === {this.state.id} */}
          {/* ## ID DO CARRINHO === {this.props.carrinho.id} */}
          ## STATE ID ITEM DO CARRINHO === {this.props.carrinhoEntity.listItens[0].id}
          ## STATE PRODUTO DO CARRINHO === {this.props.carrinhoEntity.listItens[0].valorTotal}
          {/* BOTÃO CRIAR NOVO CARRINHO */}
          {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ecommerceApp.carrinho.home.createLabel">Create new Carrinho</Translate>
          </Link> */}
          {/* ===================================================================================== */}
        </h2>
        <div className="table-responsive">
          {/* {carrinhoList && carrinhoList.length > 0 ? ( */}
          {carrinhoEntity && carrinhoEntity.listItens.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand">
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>

                  <th className="hand">
                    Produto <FontAwesomeIcon icon="sort" />
                  </th>

                  <th className="hand">
                    Quantidade <FontAwesomeIcon icon="sort" />
                  </th>

                  <th className="hand">
                    {/* <Translate contentKey="ecommerceApp.carrinho.totalCarrinho">Total Carrinho</Translate> <FontAwesomeIcon icon="sort" /> */}
                    Preço do item <FontAwesomeIcon icon="sort" />
                  </th>
                </tr>
              </thead>

              {/* =================== DADOS DA TABELA DO CARRINHO ============================ */}
              <tbody>
                {/* {carrinhoList.map((carrinho, i) => ( */}
                {carrinhoEntity.listItens.map((item, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${item.id}`} color="link" size="sm">
                        {item.id}
                      </Button>
                    </td>
                    <td>NOME DO PRODUTO</td>
                    <td>
                      {/* QUANTIDADE DO PRODUTO */}
                      {item.quantidade}
                      {/* <AvField id="item-quantidade" type="text" name="quantidade" /> */}
                      {/* <AvField id="item-quantidade" type="text" name="quantidade" /> */}
                    </td>

                    <td>{item.valorItem}</td>

                    {/* <td>{item.totalitem}</td> */}

                    {/* Botões  */}
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        {/* <Button tag={Link} to={`${match.url}/${item.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button> */}
                        {/* <Button tag={Link} to={`${match.url}/${item.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button> */}
                        <Button tag={Link} to={`${match.url}/${item.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="ecommerceApp.carrinho.home.notFound">No carrinhos found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ carrinho, cliente, authentication }: IRootState) => ({
  // carrinhoList: carrinho.entities,
  totalItems: carrinho.totalItems,
  clienteEntity: cliente.entity,
  account: authentication.account,
  carrinhoEntity: carrinho.entity
});

const mapDispatchToProps = {
  getSession,
  getCarrinhoById,
  getClienteById
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrinho);
