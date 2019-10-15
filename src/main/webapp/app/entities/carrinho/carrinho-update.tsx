import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IItem } from 'app/shared/model/item.model';
import { getEntities as getItems } from 'app/entities/item/item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './carrinho.reducer';
import { ICarrinho } from 'app/shared/model/carrinho.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarrinhoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICarrinhoUpdateState {
  isNew: boolean;
  idslistItens: any[];
}

export class CarrinhoUpdate extends React.Component<ICarrinhoUpdateProps, ICarrinhoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslistItens: [],
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

    this.props.getItems();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { carrinhoEntity } = this.props;
      const entity = {
        ...carrinhoEntity,
        ...values,
        listItens: mapIdList(values.listItens)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/carrinho');
  };

  render() {
    const { carrinhoEntity, items, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.carrinho.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.carrinho.home.createOrEditLabel">Create or edit a Carrinho</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : carrinhoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="carrinho-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="carrinho-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="totalCarrinhoLabel" for="carrinho-totalCarrinho">
                    <Translate contentKey="ecommerceApp.carrinho.totalCarrinho">Total Carrinho</Translate>
                  </Label>
                  <AvField id="carrinho-totalCarrinho" type="text" name="totalCarrinho" />
                </AvGroup>
                <AvGroup>
                  <Label for="carrinho-listItens">
                    <Translate contentKey="ecommerceApp.carrinho.listItens">List Itens</Translate>
                  </Label>
                  <AvInput
                    id="carrinho-listItens"
                    type="select"
                    multiple
                    className="form-control"
                    name="listItens"
                    value={carrinhoEntity.listItens && carrinhoEntity.listItens.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {items
                      ? items.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/carrinho" replace color="info">
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
  items: storeState.item.entities,
  carrinhoEntity: storeState.carrinho.entity,
  loading: storeState.carrinho.loading,
  updating: storeState.carrinho.updating,
  updateSuccess: storeState.carrinho.updateSuccess
});

const mapDispatchToProps = {
  getItems,
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
)(CarrinhoUpdate);
