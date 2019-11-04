import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICliente } from 'app/shared/model/cliente.model';
import { getEntities as getClientes } from 'app/entities/cliente/cliente.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
import { getEntities as getEnderecos } from 'app/entities/endereco/endereco.reducer';
import { IModoPagamento } from 'app/shared/model/modo-pagamento.model';
import { getEntities as getModoPagamentos } from 'app/entities/modo-pagamento/modo-pagamento.reducer';
import { IVendedor } from 'app/shared/model/vendedor.model';
import { getEntities as getVendedors } from 'app/entities/vendedor/vendedor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './venda.reducer';
import { IVenda } from 'app/shared/model/venda.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVendaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVendaUpdateState {
  isNew: boolean;
  idslistVendedores: any[];
  compradorId: string;
  enderecoEntregaId: string;
  modoPagamentoId: string;
}

export class VendaUpdate extends React.Component<IVendaUpdateProps, IVendaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslistVendedores: [],
      compradorId: '0',
      enderecoEntregaId: '0',
      modoPagamentoId: '0',
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

    this.props.getClientes();
    this.props.getEnderecos();
    this.props.getModoPagamentos();
    this.props.getVendedors();
  }

  saveEntity = (event, errors, values) => {
    values.dataHora = convertDateTimeToServer(values.dataHora);

    if (errors.length === 0) {
      const { vendaEntity } = this.props;
      const entity = {
        ...vendaEntity,
        ...values,
        listVendedores: mapIdList(values.listVendedores)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/venda');
  };

  render() {
    const { vendaEntity, clientes, enderecos, modoPagamentos, vendedors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.venda.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.venda.home.createOrEditLabel">Create or edit a Venda</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : vendaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="venda-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="venda-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dataHoraLabel" for="venda-dataHora">
                    <Translate contentKey="ecommerceApp.venda.dataHora">Data Hora</Translate>
                  </Label>
                  <AvInput
                    id="venda-dataHora"
                    type="datetime-local"
                    className="form-control"
                    name="dataHora"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.vendaEntity.dataHora)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="totalVendaLabel" for="venda-totalVenda">
                    <Translate contentKey="ecommerceApp.venda.totalVenda">Total Venda</Translate>
                  </Label>
                  <AvField id="venda-totalVenda" type="text" name="totalVenda" />
                </AvGroup>
                <AvGroup>
                  <Label for="venda-comprador">
                    <Translate contentKey="ecommerceApp.venda.comprador">Comprador</Translate>
                  </Label>
                  <AvInput id="venda-comprador" type="select" className="form-control" name="comprador.id">
                    <option value="" key="0" />
                    {clientes
                      ? clientes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="venda-enderecoEntrega">
                    <Translate contentKey="ecommerceApp.venda.enderecoEntrega">Endereco Entrega</Translate>
                  </Label>
                  <AvInput id="venda-enderecoEntrega" type="select" className="form-control" name="enderecoEntrega.id">
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
                  <Label for="venda-modoPagamento">
                    <Translate contentKey="ecommerceApp.venda.modoPagamento">Modo Pagamento</Translate>
                  </Label>
                  <AvInput id="venda-modoPagamento" type="select" className="form-control" name="modoPagamento.id">
                    <option value="" key="0" />
                    {modoPagamentos
                      ? modoPagamentos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="venda-listVendedores">
                    <Translate contentKey="ecommerceApp.venda.listVendedores">List Vendedores</Translate>
                  </Label>
                  <AvInput
                    id="venda-listVendedores"
                    type="select"
                    multiple
                    className="form-control"
                    name="listVendedores"
                    value={vendaEntity.listVendedores && vendaEntity.listVendedores.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {vendedors
                      ? vendedors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/venda" replace color="info">
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
  clientes: storeState.cliente.entities,
  enderecos: storeState.endereco.entities,
  modoPagamentos: storeState.modoPagamento.entities,
  vendedors: storeState.vendedor.entities,
  vendaEntity: storeState.venda.entity,
  loading: storeState.venda.loading,
  updating: storeState.venda.updating,
  updateSuccess: storeState.venda.updateSuccess
});

const mapDispatchToProps = {
  getClientes,
  getEnderecos,
  getModoPagamentos,
  getVendedors,
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
)(VendaUpdate);
