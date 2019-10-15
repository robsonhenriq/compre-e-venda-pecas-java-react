import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './avaliacao.reducer';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvaliacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AvaliacaoDetail extends React.Component<IAvaliacaoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { avaliacaoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.avaliacao.detail.title">Avaliacao</Translate> [<b>{avaliacaoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dataHora">
                <Translate contentKey="ecommerceApp.avaliacao.dataHora">Data Hora</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={avaliacaoEntity.dataHora} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="descricao">
                <Translate contentKey="ecommerceApp.avaliacao.descricao">Descricao</Translate>
              </span>
            </dt>
            <dd>{avaliacaoEntity.descricao}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.avaliacao.listCliente">List Cliente</Translate>
            </dt>
            <dd>
              {avaliacaoEntity.listClientes
                ? avaliacaoEntity.listClientes.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === avaliacaoEntity.listClientes.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/avaliacao" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/avaliacao/${avaliacaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ avaliacao }: IRootState) => ({
  avaliacaoEntity: avaliacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvaliacaoDetail);
