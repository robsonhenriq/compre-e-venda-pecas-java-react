import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './veiculo.reducer';
import { IVeiculo } from 'app/shared/model/veiculo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVeiculoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VeiculoDetail extends React.Component<IVeiculoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { veiculoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.veiculo.detail.title">Veiculo</Translate> [<b>{veiculoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="ecommerceApp.veiculo.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{veiculoEntity.nome}</dd>
            <dt>
              <span id="ano">
                <Translate contentKey="ecommerceApp.veiculo.ano">Ano</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={veiculoEntity.ano} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="ecommerceApp.veiculo.marca">Marca</Translate>
            </dt>
            <dd>{veiculoEntity.marcaId ? veiculoEntity.marcaId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/veiculo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/veiculo/${veiculoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ veiculo }: IRootState) => ({
  veiculoEntity: veiculo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VeiculoDetail);
