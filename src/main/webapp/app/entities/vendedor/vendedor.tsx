import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './vendedor.reducer';
import { IVendedor } from 'app/shared/model/vendedor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IVendedorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IVendedorState = IPaginationBaseState;

export class Vendedor extends React.Component<IVendedorProps, IVendedorState> {
  state: IVendedorState = {
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
    const { vendedorList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="vendedor-heading">
          <Translate contentKey="ecommerceApp.vendedor.home.title">Vendedors</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="ecommerceApp.vendedor.home.createLabel">Create new Vendedor</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {vendedorList && vendedorList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ehEmpresa')}>
                    <Translate contentKey="ecommerceApp.vendedor.ehEmpresa">Eh Empresa</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('razaoSocial')}>
                    <Translate contentKey="ecommerceApp.vendedor.razaoSocial">Razao Social</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('cnpj')}>
                    <Translate contentKey="ecommerceApp.vendedor.cnpj">Cnpj</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('cpf')}>
                    <Translate contentKey="ecommerceApp.vendedor.cpf">Cpf</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('dataCadastro')}>
                    <Translate contentKey="ecommerceApp.vendedor.dataCadastro">Data Cadastro</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('dataNascimento')}>
                    <Translate contentKey="ecommerceApp.vendedor.dataNascimento">Data Nascimento</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('descricao')}>
                    <Translate contentKey="ecommerceApp.vendedor.descricao">Descricao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="ecommerceApp.vendedor.usuario">Usuario</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="ecommerceApp.vendedor.endereco">Endereco</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {vendedorList.map((vendedor, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${vendedor.id}`} color="link" size="sm">
                        {vendedor.id}
                      </Button>
                    </td>
                    <td>{vendedor.ehEmpresa ? 'true' : 'false'}</td>
                    <td>{vendedor.razaoSocial}</td>
                    <td>{vendedor.cnpj}</td>
                    <td>{vendedor.cpf}</td>
                    <td>
                      <TextFormat type="date" value={vendedor.dataCadastro} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={vendedor.dataNascimento} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{vendedor.descricao}</td>
                    <td>{vendedor.usuarioId ? vendedor.usuarioId : ''}</td>
                    <td>{vendedor.enderecoId ? <Link to={`endereco/${vendedor.enderecoId}`}>{vendedor.enderecoId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${vendedor.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${vendedor.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${vendedor.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ecommerceApp.vendedor.home.notFound">No Vendedors found</Translate>
            </div>
          )}
        </div>
        <div className={vendedorList && vendedorList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ vendedor }: IRootState) => ({
  vendedorList: vendedor.entities,
  totalItems: vendedor.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vendedor);
