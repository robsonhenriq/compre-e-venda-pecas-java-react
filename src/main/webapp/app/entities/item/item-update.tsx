import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduto } from 'app/shared/model/produto.model';
import { getEntities as getProdutos } from 'app/entities/produto/produto.reducer';
import { ICarrinho } from 'app/shared/model/carrinho.model';
import { getEntities as getCarrinhos } from 'app/entities/carrinho/carrinho.reducer';
import { IVenda } from 'app/shared/model/venda.model';
import { getEntities as getVendas } from 'app/entities/venda/venda.reducer';
import { getEntity, updateEntity, createEntity, reset } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IItemUpdateState {
  isNew: boolean;
  produtoId: string;
  listCarrinhosId: string;
  vendaId: string;
}

export class ItemUpdate extends React.Component<IItemUpdateProps, IItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      produtoId: '0',
      listCarrinhosId: '0',
      vendaId: '0',
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

    this.props.getProdutos();
    this.props.getCarrinhos();
    this.props.getVendas();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { itemEntity } = this.props;
      const entity = {
        ...itemEntity,
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
    this.props.history.push('/entity/item');
  };

  render() {
    const { itemEntity, produtos, carrinhos, vendas, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.item.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.item.home.createOrEditLabel">Create or edit a Item</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : itemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="item-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="valorTotalLabel" for="item-valorTotal">
                    <Translate contentKey="ecommerceApp.item.valorTotal">Valor Total</Translate>
                  </Label>
                  <AvField
                    id="item-valorTotal"
                    type="text"
                    name="valorTotal"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="valorItemLabel" for="item-valorItem">
                    <Translate contentKey="ecommerceApp.item.valorItem">Valor Item</Translate>
                  </Label>
                  <AvField
                    id="item-valorItem"
                    type="text"
                    name="valorItem"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="quantidadeLabel" for="item-quantidade">
                    <Translate contentKey="ecommerceApp.item.quantidade">Quantidade</Translate>
                  </Label>
                  <AvField
                    id="item-quantidade"
                    type="string"
                    className="form-control"
                    name="quantidade"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="item-produto">
                    <Translate contentKey="ecommerceApp.item.produto">Produto</Translate>
                  </Label>
                  <AvInput id="item-produto" type="select" className="form-control" name="produtoId">
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
                <AvGroup>
                  <Label for="item-venda">
                    <Translate contentKey="ecommerceApp.item.venda">Venda</Translate>
                  </Label>
                  <AvInput id="item-venda" type="select" className="form-control" name="vendaId">
                    <option value="" key="0" />
                    {vendas
                      ? vendas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/item" replace color="info">
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
  produtos: storeState.produto.entities,
  carrinhos: storeState.carrinho.entities,
  vendas: storeState.venda.entities,
  itemEntity: storeState.item.entity,
  loading: storeState.item.loading,
  updating: storeState.item.updating,
  updateSuccess: storeState.item.updateSuccess
});

const mapDispatchToProps = {
  getProdutos,
  getCarrinhos,
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
)(ItemUpdate);
