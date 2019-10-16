import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMarca } from 'app/shared/model/marca.model';
import { getEntities as getMarcas } from 'app/entities/marca/marca.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
import { getEntities as getClientes } from 'app/entities/cliente/cliente.reducer';
import { IProduto } from 'app/shared/model/produto.model';
import { getEntities as getProdutos } from 'app/entities/produto/produto.reducer';
import { getEntity, updateEntity, createEntity, reset } from './veiculo.reducer';
import { IVeiculo } from 'app/shared/model/veiculo.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVeiculoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVeiculoUpdateState {
  isNew: boolean;
  marcaId: string;
  listClientesId: string;
  listProdutosId: string;
}

export class VeiculoUpdate extends React.Component<IVeiculoUpdateProps, IVeiculoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      marcaId: '0',
      listClientesId: '0',
      listProdutosId: '0',
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

    this.props.getMarcas();
    this.props.getClientes();
    this.props.getProdutos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { veiculoEntity } = this.props;
      const entity = {
        ...veiculoEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/veiculo');
  };

  render() {
    const { veiculoEntity, marcas, clientes, produtos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.veiculo.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.veiculo.home.createOrEditLabel">Create or edit a Veiculo</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : veiculoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="veiculo-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="veiculo-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="veiculo-nome">
                    <Translate contentKey="ecommerceApp.veiculo.nome">Nome</Translate>
                  </Label>
                  <AvField
                    id="veiculo-nome"
                    type="text"
                    name="nome"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="anoLabel" for="veiculo-ano">
                    <Translate contentKey="ecommerceApp.veiculo.ano">Ano</Translate>
                  </Label>
                  <AvField
                    id="veiculo-ano"
                    type="date"
                    className="form-control"
                    name="ano"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="veiculo-marca">
                    <Translate contentKey="ecommerceApp.veiculo.marca">Marca</Translate>
                  </Label>
                  <AvInput id="veiculo-marca" type="select" className="form-control" name="marcaId">
                    <option value="" key="0" />
                    {marcas
                      ? marcas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/veiculo" replace color="info">
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
  marcas: storeState.marca.entities,
  clientes: storeState.cliente.entities,
  produtos: storeState.produto.entities,
  veiculoEntity: storeState.veiculo.entity,
  loading: storeState.veiculo.loading,
  updating: storeState.veiculo.updating,
  updateSuccess: storeState.veiculo.updateSuccess
});

const mapDispatchToProps = {
  getMarcas,
  getClientes,
  getProdutos,
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
)(VeiculoUpdate);
