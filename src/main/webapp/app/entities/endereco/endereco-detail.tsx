import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnderecoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EnderecoDetail extends React.Component<IEnderecoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { enderecoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.endereco.detail.title">Endereco</Translate> [<b>{enderecoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="rua">
                <Translate contentKey="ecommerceApp.endereco.rua">Rua</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.rua}</dd>
            <dt>
              <span id="bairro">
                <Translate contentKey="ecommerceApp.endereco.bairro">Bairro</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.bairro}</dd>
            <dt>
              <span id="complemento">
                <Translate contentKey="ecommerceApp.endereco.complemento">Complemento</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.complemento}</dd>
            <dt>
              <span id="numero">
                <Translate contentKey="ecommerceApp.endereco.numero">Numero</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.numero}</dd>
            <dt>
              <span id="cidade">
                <Translate contentKey="ecommerceApp.endereco.cidade">Cidade</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.cidade}</dd>
            <dt>
              <span id="cep">
                <Translate contentKey="ecommerceApp.endereco.cep">Cep</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.cep}</dd>
            <dt>
              <span id="estado">
                <Translate contentKey="ecommerceApp.endereco.estado">Estado</Translate>
              </span>
            </dt>
            <dd>{enderecoEntity.estado}</dd>
          </dl>
          <Button tag={Link} to="/entity/endereco" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/endereco/${enderecoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ endereco }: IRootState) => ({
  enderecoEntity: endereco.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnderecoDetail);
