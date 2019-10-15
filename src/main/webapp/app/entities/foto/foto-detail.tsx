import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foto.reducer';
import { IFoto } from 'app/shared/model/foto.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FotoDetail extends React.Component<IFotoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fotoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.foto.detail.title">Foto</Translate> [<b>{fotoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="ecommerceApp.foto.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{fotoEntity.nome}</dd>
            <dt>
              <span id="imagem">
                <Translate contentKey="ecommerceApp.foto.imagem">Imagem</Translate>
              </span>
            </dt>
            <dd>
              {fotoEntity.imagem ? (
                <div>
                  <a onClick={openFile(fotoEntity.imagemContentType, fotoEntity.imagem)}>
                    <img src={`data:${fotoEntity.imagemContentType};base64,${fotoEntity.imagem}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {fotoEntity.imagemContentType}, {byteSize(fotoEntity.imagem)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/foto" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/foto/${fotoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ foto }: IRootState) => ({
  fotoEntity: foto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FotoDetail);
