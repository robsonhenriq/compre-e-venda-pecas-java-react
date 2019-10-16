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
import { IProduto } from 'app/shared/model/produto.model';
import { getEntities as getProdutos } from 'app/entities/produto/produto.reducer';
import { getEntity, updateEntity, createEntity, reset } from './avaliacao.reducer';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAvaliacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAvaliacaoUpdateState {
  isNew: boolean;
  idslistClientes: any[];
  listProdutosId: string;
}

export class AvaliacaoUpdate extends React.Component<IAvaliacaoUpdateProps, IAvaliacaoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslistClientes: [],
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

    this.props.getClientes();
    this.props.getProdutos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { avaliacaoEntity } = this.props;
      const entity = {
        ...avaliacaoEntity,
        ...values,
        listClientes: mapIdList(values.listClientes)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/avaliacao');
  };

  render() {
    const { avaliacaoEntity, clientes, produtos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.avaliacao.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.avaliacao.home.createOrEditLabel">Create or edit a Avaliacao</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : avaliacaoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="avaliacao-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="avaliacao-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dataHoraLabel" for="avaliacao-dataHora">
                    <Translate contentKey="ecommerceApp.avaliacao.dataHora">Data Hora</Translate>
                  </Label>
                  <AvField id="avaliacao-dataHora" type="date" className="form-control" name="dataHora" />
                </AvGroup>
                <AvGroup>
                  <Label id="descricaoLabel" for="avaliacao-descricao">
                    <Translate contentKey="ecommerceApp.avaliacao.descricao">Descricao</Translate>
                  </Label>
                  <AvField id="avaliacao-descricao" type="text" name="descricao" />
                </AvGroup>
                <AvGroup>
                  <Label for="avaliacao-listClientes">
                    <Translate contentKey="ecommerceApp.avaliacao.listClientes">List Clientes</Translate>
                  </Label>
                  <AvInput
                    id="avaliacao-listClientes"
                    type="select"
                    multiple
                    className="form-control"
                    name="listClientes"
                    value={avaliacaoEntity.listClientes && avaliacaoEntity.listClientes.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/avaliacao" replace color="info">
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
  produtos: storeState.produto.entities,
  avaliacaoEntity: storeState.avaliacao.entity,
  loading: storeState.avaliacao.loading,
  updating: storeState.avaliacao.updating,
  updateSuccess: storeState.avaliacao.updateSuccess
});

const mapDispatchToProps = {
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
)(AvaliacaoUpdate);
