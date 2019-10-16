import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IProduto } from 'app/shared/model/produto.model';
import { getEntities as getProdutos } from 'app/entities/produto/produto.reducer';
import { IVenda } from 'app/shared/model/venda.model';
import { getEntities as getVendas } from 'app/entities/venda/venda.reducer';
import { getEntity, updateEntity, createEntity, reset } from './vendedor.reducer';
import { IVendedor } from 'app/shared/model/vendedor.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVendedorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVendedorUpdateState {
  isNew: boolean;
  idslistProdutos: any[];
  usuarioId: string;
  enderecoId: string;
  listVendasId: string;
}

export class VendedorUpdate extends React.Component<IVendedorUpdateProps, IVendedorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslistProdutos: [],
      usuarioId: '0',
      enderecoId: '0',
      listVendasId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getEnderecos();
    this.props.getProdutos();
    this.props.getVendas();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { vendedorEntity } = this.props;
      const entity = {
        ...vendedorEntity,
        ...values,
        listProdutos: mapIdList(values.listProdutos)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/vendedor');
  };

  render() {
    const { vendedorEntity, users, enderecos, produtos, vendas, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.vendedor.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.vendedor.home.createOrEditLabel">Create or edit a Vendedor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vendedorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="vendedor-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="vendedor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ehEmpresaLabel" check>
                    <AvInput id="vendedor-ehEmpresa" type="checkbox" className="form-control" name="ehEmpresa" />
                    <Translate contentKey="ecommerceApp.vendedor.ehEmpresa">Eh Empresa</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="razaoSocialLabel" for="vendedor-razaoSocial">
                    <Translate contentKey="ecommerceApp.vendedor.razaoSocial">Razao Social</Translate>
                  </Label>
                  <AvField id="vendedor-razaoSocial" type="text" name="razaoSocial" />
                </AvGroup>
                <AvGroup>
                  <Label id="cnpjLabel" for="vendedor-cnpj">
                    <Translate contentKey="ecommerceApp.vendedor.cnpj">Cnpj</Translate>
                  </Label>
                  <AvField id="vendedor-cnpj" type="text" name="cnpj" />
                </AvGroup>
                <AvGroup>
                  <Label id="cpfLabel" for="vendedor-cpf">
                    <Translate contentKey="ecommerceApp.vendedor.cpf">Cpf</Translate>
                  </Label>
                  <AvField id="vendedor-cpf" type="text" name="cpf" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataCadastroLabel" for="vendedor-dataCadastro">
                    <Translate contentKey="ecommerceApp.vendedor.dataCadastro">Data Cadastro</Translate>
                  </Label>
                  <AvField id="vendedor-dataCadastro" type="date" className="form-control" name="dataCadastro" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataNascimentoLabel" for="vendedor-dataNascimento">
                    <Translate contentKey="ecommerceApp.vendedor.dataNascimento">Data Nascimento</Translate>
                  </Label>
                  <AvField id="vendedor-dataNascimento" type="date" className="form-control" name="dataNascimento" />
                </AvGroup>
                <AvGroup>
                  <Label id="descricaoLabel" for="vendedor-descricao">
                    <Translate contentKey="ecommerceApp.vendedor.descricao">Descricao</Translate>
                  </Label>
                  <AvField id="vendedor-descricao" type="text" name="descricao" />
                </AvGroup>
                <AvGroup>
                  <Label for="vendedor-usuario">
                    <Translate contentKey="ecommerceApp.vendedor.usuario">Usuario</Translate>
                  </Label>
                  <AvInput id="vendedor-usuario" type="select" className="form-control" name="usuarioId">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vendedor-endereco">
                    <Translate contentKey="ecommerceApp.vendedor.endereco">Endereco</Translate>
                  </Label>
                  <AvInput id="vendedor-endereco" type="select" className="form-control" name="enderecoId">
                    <option value="" key="0" />
                    {enderecos
                      ? enderecos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="vendedor-listProdutos">
                    <Translate contentKey="ecommerceApp.vendedor.listProdutos">List Produtos</Translate>
                  </Label>
                  <AvInput
                    id="vendedor-listProdutos"
                    type="select"
                    multiple
                    className="form-control"
                    name="listProdutos"
                    value={vendedorEntity.listProdutos && vendedorEntity.listProdutos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {produtos
                      ? produtos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/vendedor" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  enderecos: storeState.endereco.entities,
  produtos: storeState.produto.entities,
  vendas: storeState.venda.entities,
  vendedorEntity: storeState.vendedor.entity,
  loading: storeState.vendedor.loading,
  updating: storeState.vendedor.updating,
  updateSuccess: storeState.vendedor.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEnderecos,
  getProdutos,
  getVendas,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendedorUpdate);
