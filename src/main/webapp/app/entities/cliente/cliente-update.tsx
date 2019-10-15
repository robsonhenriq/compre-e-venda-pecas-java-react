import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICarrinho } from 'app/shared/model/carrinho.model';
import { getEntities as getCarrinhos } from 'app/entities/carrinho/carrinho.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IVeiculo } from 'app/shared/model/veiculo.model';
import { getEntities as getVeiculos } from 'app/entities/veiculo/veiculo.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { getEntities as getAvaliacaos } from 'app/entities/avaliacao/avaliacao.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClienteUpdateState {
  isNew: boolean;
  idslistVeiculos: any[];
  idslistEndereco: any[];
  carrinhoId: string;
  usuarioId: string;
  listAvaliacaoId: string;
}

export class ClienteUpdate extends React.Component<IClienteUpdateProps, IClienteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslistVeiculos: [],
      idslistEndereco: [],
      carrinhoId: '0',
      usuarioId: '0',
      listAvaliacaoId: '0',
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

    this.props.getCarrinhos();
    this.props.getUsers();
    this.props.getVeiculos();
    this.props.getEnderecos();
    this.props.getAvaliacaos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { clienteEntity } = this.props;
      const entity = {
        ...clienteEntity,
        ...values,
        listVeiculos: mapIdList(values.listVeiculos),
        listEnderecos: mapIdList(values.listEnderecos)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/cliente');
  };

  render() {
    const { clienteEntity, carrinhos, users, veiculos, enderecos, avaliacaos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.cliente.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.cliente.home.createOrEditLabel">Create or edit a Cliente</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clienteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="cliente-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cliente-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="cliente-nome">
                    <Translate contentKey="ecommerceApp.cliente.nome">Nome</Translate>
                  </Label>
                  <AvField
                    id="cliente-nome"
                    type="text"
                    name="nome"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cpfLabel" for="cliente-cpf">
                    <Translate contentKey="ecommerceApp.cliente.cpf">Cpf</Translate>
                  </Label>
                  <AvField id="cliente-cpf" type="text" name="cpf" />
                </AvGroup>
                <AvGroup>
                  <Label id="rgLabel" for="cliente-rg">
                    <Translate contentKey="ecommerceApp.cliente.rg">Rg</Translate>
                  </Label>
                  <AvField id="cliente-rg" type="text" name="rg" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataNascimentoLabel" for="cliente-dataNascimento">
                    <Translate contentKey="ecommerceApp.cliente.dataNascimento">Data Nascimento</Translate>
                  </Label>
                  <AvField id="cliente-dataNascimento" type="date" className="form-control" name="dataNascimento" />
                </AvGroup>
                <AvGroup>
                  <Label id="telefoneLabel" for="cliente-telefone">
                    <Translate contentKey="ecommerceApp.cliente.telefone">Telefone</Translate>
                  </Label>
                  <AvField id="cliente-telefone" type="text" name="telefone" />
                </AvGroup>
                <AvGroup>
                  <Label id="celularLabel" for="cliente-celular">
                    <Translate contentKey="ecommerceApp.cliente.celular">Celular</Translate>
                  </Label>
                  <AvField id="cliente-celular" type="text" name="celular" />
                </AvGroup>
                <AvGroup>
                  <Label for="cliente-carrinho">
                    <Translate contentKey="ecommerceApp.cliente.carrinho">Carrinho</Translate>
                  </Label>
                  <AvInput id="cliente-carrinho" type="select" className="form-control" name="carrinhoId">
                    <option value="" key="0" />
                    {carrinhos
                      ? carrinhos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="cliente-usuario">
                    <Translate contentKey="ecommerceApp.cliente.usuario">Usuario</Translate>
                  </Label>
                  <AvInput id="cliente-usuario" type="select" className="form-control" name="usuarioId">
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
                  <Label for="cliente-listVeiculos">
                    <Translate contentKey="ecommerceApp.cliente.listVeiculos">List Veiculos</Translate>
                  </Label>
                  <AvInput
                    id="cliente-listVeiculos"
                    type="select"
                    multiple
                    className="form-control"
                    name="listVeiculos"
                    value={clienteEntity.listVeiculos && clienteEntity.listVeiculos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {veiculos
                      ? veiculos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="cliente-listEndereco">
                    <Translate contentKey="ecommerceApp.cliente.listEndereco">List Endereco</Translate>
                  </Label>
                  <AvInput
                    id="cliente-listEndereco"
                    type="select"
                    multiple
                    className="form-control"
                    name="listEnderecos"
                    value={clienteEntity.listEnderecos && clienteEntity.listEnderecos.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/cliente" replace color="info">
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
  carrinhos: storeState.carrinho.entities,
  users: storeState.userManagement.users,
  veiculos: storeState.veiculo.entities,
  enderecos: storeState.endereco.entities,
  avaliacaos: storeState.avaliacao.entities,
  clienteEntity: storeState.cliente.entity,
  loading: storeState.cliente.loading,
  updating: storeState.cliente.updating,
  updateSuccess: storeState.cliente.updateSuccess
});

const mapDispatchToProps = {
  getCarrinhos,
  getUsers,
  getVeiculos,
  getEnderecos,
  getAvaliacaos,
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
)(ClienteUpdate);
