import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProduto } from 'app/shared/model/produto.model';
import { getEntities as getProdutos } from 'app/entities/produto/produto.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './foto.reducer';
import { IFoto } from 'app/shared/model/foto.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFotoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFotoUpdateState {
  isNew: boolean;
  listProdutosId: string;
}

export class FotoUpdate extends React.Component<IFotoUpdateProps, IFotoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getProdutos();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { fotoEntity } = this.props;
      const entity = {
        ...fotoEntity,
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
    this.props.history.push('/entity/foto');
  };

  render() {
    const { fotoEntity, produtos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { imagem, imagemContentType } = fotoEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.foto.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.foto.home.createOrEditLabel">Create or edit a Foto</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fotoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="foto-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="foto-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="foto-nome">
                    <Translate contentKey="ecommerceApp.foto.nome">Nome</Translate>
                  </Label>
                  <AvField id="foto-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imagemLabel" for="imagem">
                      <Translate contentKey="ecommerceApp.foto.imagem">Imagem</Translate>
                    </Label>
                    <br />
                    {imagem ? (
                      <div>
                        <a onClick={openFile(imagemContentType, imagem)}>
                          <img src={`data:${imagemContentType};base64,${imagem}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imagemContentType}, {byteSize(imagem)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('imagem')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_imagem" type="file" onChange={this.onBlobChange(true, 'imagem')} accept="image/*" />
                    <AvInput type="hidden" name="imagem" value={imagem} />
                  </AvGroup>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/foto" replace color="info">
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
  fotoEntity: storeState.foto.entity,
  loading: storeState.foto.loading,
  updating: storeState.foto.updating,
  updateSuccess: storeState.foto.updateSuccess
});

const mapDispatchToProps = {
  getProdutos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FotoUpdate);
