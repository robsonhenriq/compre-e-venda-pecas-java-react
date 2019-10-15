import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './modo-pagamento.reducer';
import { IModoPagamento } from 'app/shared/model/modo-pagamento.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModoPagamentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ModoPagamentoDetail extends React.Component<IModoPagamentoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { modoPagamentoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.modoPagamento.detail.title">ModoPagamento</Translate> [<b>{modoPagamentoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="descricao">
                <Translate contentKey="ecommerceApp.modoPagamento.descricao">Descricao</Translate>
              </span>
            </dt>
            <dd>{modoPagamentoEntity.descricao}</dd>
            <dt>
              <span id="tipoPagamento">
                <Translate contentKey="ecommerceApp.modoPagamento.tipoPagamento">Tipo Pagamento</Translate>
              </span>
            </dt>
            <dd>{modoPagamentoEntity.tipoPagamento}</dd>
          </dl>
          <Button tag={Link} to="/entity/modo-pagamento" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/modo-pagamento/${modoPagamentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ modoPagamento }: IRootState) => ({
  modoPagamentoEntity: modoPagamento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModoPagamentoDetail);
