import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carrinho.reducer';
import { ICarrinho } from 'app/shared/model/carrinho.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarrinhoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CarrinhoDetail extends React.Component<ICarrinhoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { carrinhoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.carrinho.detail.title">Carrinho</Translate> [<b>{carrinhoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="totalCarrinho">
                <Translate contentKey="ecommerceApp.carrinho.totalCarrinho">Total Carrinho</Translate>
              </span>
            </dt>
            <dd>{carrinhoEntity.totalCarrinho}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.carrinho.listItens">List Itens</Translate>
            </dt>
            <dd>
              {carrinhoEntity.listItens
                ? carrinhoEntity.listItens.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === carrinhoEntity.listItens.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/carrinho" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/carrinho/${carrinhoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ carrinho }: IRootState) => ({
  carrinhoEntity: carrinho.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarrinhoDetail);
