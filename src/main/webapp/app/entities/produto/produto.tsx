import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './produto.reducer';
import { IProduto } from 'app/shared/model/produto.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProdutoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IProdutoState = IPaginationBaseState;

export class Produto extends React.Component<IProdutoProps, IProdutoState> {
  state: IProdutoState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { produtoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="produto-heading">
          <Translate contentKey="ecommerceApp.produto.home.title">Produtos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ecommerceApp.produto.home.createLabel">Create new Produto</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {produtoList && produtoList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('codigoOriginal')}>
                    <Translate contentKey="ecommerceApp.produto.codigoOriginal">Codigo Original</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('fabricante')}>
                    <Translate contentKey="ecommerceApp.produto.fabricante">Fabricante</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('descricao')}>
                    <Translate contentKey="ecommerceApp.produto.descricao">Descricao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ehUsado')}>
                    <Translate contentKey="ecommerceApp.produto.ehUsado">Eh Usado</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('quantidadeDisponivel')}>
                    <Translate contentKey="ecommerceApp.produto.quantidadeDisponivel">Quantidade Disponivel</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('altura')}>
                    <Translate contentKey="ecommerceApp.produto.altura">Altura</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('largura')}>
                    <Translate contentKey="ecommerceApp.produto.largura">Largura</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('pesoBruto')}>
                    <Translate contentKey="ecommerceApp.produto.pesoBruto">Peso Bruto</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('precoAVista')}>
                    <Translate contentKey="ecommerceApp.produto.precoAVista">Preco A Vista</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('precoAPrazo')}>
                    <Translate contentKey="ecommerceApp.produto.precoAPrazo">Preco A Prazo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('categoria')}>
                    <Translate contentKey="ecommerceApp.produto.categoria">Categoria</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="ecommerceApp.produto.marca">Marca</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {produtoList.map((produto, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${produto.id}`} color="link" size="sm">
                        {produto.id}
                      </Button>
                    </td>
                    <td>{produto.codigoOriginal}</td>
                    <td>{produto.fabricante}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.ehUsado ? 'true' : 'false'}</td>
                    <td>{produto.quantidadeDisponivel}</td>
                    <td>{produto.altura}</td>
                    <td>{produto.largura}</td>
                    <td>{produto.pesoBruto}</td>
                    <td>{produto.precoAVista}</td>
                    <td>{produto.precoAPrazo}</td>
                    <td>
                      <Translate contentKey={`ecommerceApp.Categoria.${produto.categoria}`} />
                    </td>
                    <td>{produto.marca ? <Link to={`marca/${produto.marca.id}`}>{produto.marca.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${produto.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${produto.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${produto.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ecommerceApp.produto.home.notFound">No Produtos found</Translate>
            </div>
          )}
        </div>
        <div className={produtoList && produtoList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ produto }: IRootState) => ({
  produtoList: produto.entities,
  totalItems: produto.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Produto);
