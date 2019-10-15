import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './venda.reducer';
import { IVenda } from 'app/shared/model/venda.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VendaDetail extends React.Component<IVendaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vendaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.venda.detail.title">Venda</Translate> [<b>{vendaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dataHora">
                <Translate contentKey="ecommerceApp.venda.dataHora">Data Hora</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={vendaEntity.dataHora} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="totalVenda">
                <Translate contentKey="ecommerceApp.venda.totalVenda">Total Venda</Translate>
              </span>
            </dt>
            <dd>{vendaEntity.totalVenda}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.venda.comprador">Comprador</Translate>
            </dt>
            <dd>{vendaEntity.compradorId ? vendaEntity.compradorId : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.venda.enderecoEntrega">Endereco Entrega</Translate>
            </dt>
            <dd>{vendaEntity.enderecoEntregaId ? vendaEntity.enderecoEntregaId : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.venda.modoPagamento">Modo Pagamento</Translate>
            </dt>
            <dd>{vendaEntity.modoPagamentoId ? vendaEntity.modoPagamentoId : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.venda.listVendedores">List Vendedores</Translate>
            </dt>
            <dd>
              {vendaEntity.listVendedores
                ? vendaEntity.listVendedores.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === vendaEntity.listVendedores.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/venda" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/venda/${vendaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ venda }: IRootState) => ({
  vendaEntity: venda.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendaDetail);
