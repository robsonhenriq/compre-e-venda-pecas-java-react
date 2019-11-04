import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMarca } from 'app/shared/model/marca.model';
import { getEntities as getMarcas } from 'app/entities/marca/marca.reducer';
import { IFoto } from 'app/shared/model/foto.model';
import { getEntities as getFotos } from 'app/entities/foto/foto.reducer';
import { IVeiculo } from 'app/shared/model/veiculo.model';
import { getEntities as getVeiculos } from 'app/entities/veiculo/veiculo.reducer';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { getEntities as getAvaliacaos } from 'app/entities/avaliacao/avaliacao.reducer';
import { IVendedor } from 'app/shared/model/vendedor.model';
import { getEntities as getVendedors } from 'app/entities/vendedor/vendedor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './produto.reducer';
import { IProduto } from 'app/shared/model/produto.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProdutoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProdutoUpdateState {
  isNew: boolean;
  idslistFotos: any[];
  idsaplicacoes: any[];
  idslistAvaliacao: any[];
  marcaId: string;
  listVendedoresId: string;
}

export class ProdutoUpdate extends React.Component<IProdutoUpdateProps, IProdutoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idslistFotos: [],
      idsaplicacoes: [],
      idslistAvaliacao: [],
      marcaId: '0',
      listVendedoresId: '0',
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

    this.props.getMarcas();
    this.props.getFotos();
    this.props.getVeiculos();
    this.props.getAvaliacaos();
    this.props.getVendedors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { produtoEntity } = this.props;
      const entity = {
        ...produtoEntity,
        ...values,
        listFotos: mapIdList(values.listFotos),
        aplicacoes: mapIdList(values.aplicacoes),
        listAvaliacaos: mapIdList(values.listAvaliacaos)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/produto');
  };

  render() {
    const { produtoEntity, marcas, fotos, veiculos, avaliacaos, vendedors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.produto.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.produto.home.createOrEditLabel">Create or edit a Produto</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : produtoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="produto-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="produto-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codigoOriginalLabel" for="produto-codigoOriginal">
                    <Translate contentKey="ecommerceApp.produto.codigoOriginal">Codigo Original</Translate>
                  </Label>
                  <AvField id="produto-codigoOriginal" type="text" name="codigoOriginal" />
                </AvGroup>
                <AvGroup>
                  <Label id="fabricanteLabel" for="produto-fabricante">
                    <Translate contentKey="ecommerceApp.produto.fabricante">Fabricante</Translate>
                  </Label>
                  <AvField id="produto-fabricante" type="text" name="fabricante" />
                </AvGroup>
                <AvGroup>
                  <Label id="descricaoLabel" for="produto-descricao">
                    <Translate contentKey="ecommerceApp.produto.descricao">Descricao</Translate>
                  </Label>
                  <AvField
                    id="produto-descricao"
                    type="text"
                    name="descricao"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 5, errorMessage: translate('entity.validation.minlength', { min: 5 }) },
                      maxLength: { value: 240, errorMessage: translate('entity.validation.maxlength', { max: 240 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="ehUsadoLabel" check>
                    <AvInput id="produto-ehUsado" type="checkbox" className="form-control" name="ehUsado" />
                    <Translate contentKey="ecommerceApp.produto.ehUsado">Eh Usado</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="quantidadeDisponivelLabel" for="produto-quantidadeDisponivel">
                    <Translate contentKey="ecommerceApp.produto.quantidadeDisponivel">Quantidade Disponivel</Translate>
                  </Label>
                  <AvField
                    id="produto-quantidadeDisponivel"
                    type="string"
                    className="form-control"
                    name="quantidadeDisponivel"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="alturaLabel" for="produto-altura">
                    <Translate contentKey="ecommerceApp.produto.altura">Altura</Translate>
                  </Label>
                  <AvField
                    id="produto-altura"
                    type="string"
                    className="form-control"
                    name="altura"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="larguraLabel" for="produto-largura">
                    <Translate contentKey="ecommerceApp.produto.largura">Largura</Translate>
                  </Label>
                  <AvField
                    id="produto-largura"
                    type="string"
                    className="form-control"
                    name="largura"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pesoBrutoLabel" for="produto-pesoBruto">
                    <Translate contentKey="ecommerceApp.produto.pesoBruto">Peso Bruto</Translate>
                  </Label>
                  <AvField
                    id="produto-pesoBruto"
                    type="string"
                    className="form-control"
                    name="pesoBruto"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="precoAVistaLabel" for="produto-precoAVista">
                    <Translate contentKey="ecommerceApp.produto.precoAVista">Preco A Vista</Translate>
                  </Label>
                  <AvField
                    id="produto-precoAVista"
                    type="text"
                    name="precoAVista"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="precoAPrazoLabel" for="produto-precoAPrazo">
                    <Translate contentKey="ecommerceApp.produto.precoAPrazo">Preco A Prazo</Translate>
                  </Label>
                  <AvField
                    id="produto-precoAPrazo"
                    type="text"
                    name="precoAPrazo"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="categoriaLabel" for="produto-categoria">
                    <Translate contentKey="ecommerceApp.produto.categoria">Categoria</Translate>
                  </Label>
                  <AvInput
                    id="produto-categoria"
                    type="select"
                    className="form-control"
                    name="categoria"
                    value={(!isNew && produtoEntity.categoria) || 'CARROCERIA'}
                  >
                    <option value="CARROCERIA">{translate('ecommerceApp.Categoria.CARROCERIA')}</option>
                    <option value="ACESSORIOS">{translate('ecommerceApp.Categoria.ACESSORIOS')}</option>
                    <option value="PNEUS_RODAS">{translate('ecommerceApp.Categoria.PNEUS_RODAS')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="produto-marca">
                    <Translate contentKey="ecommerceApp.produto.marca">Marca</Translate>
                  </Label>
                  <AvInput id="produto-marca" type="select" className="form-control" name="marca.id">
                    <option value="" key="0" />
                    {marcas
                      ? marcas.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="produto-listFotos">
                    <Translate contentKey="ecommerceApp.produto.listFotos">List Fotos</Translate>
                  </Label>
                  <AvInput
                    id="produto-listFotos"
                    type="select"
                    multiple
                    className="form-control"
                    name="listFotos"
                    value={produtoEntity.listFotos && produtoEntity.listFotos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {fotos
                      ? fotos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="produto-aplicacoes">
                    <Translate contentKey="ecommerceApp.produto.aplicacoes">Aplicacoes</Translate>
                  </Label>
                  <AvInput
                    id="produto-aplicacoes"
                    type="select"
                    multiple
                    className="form-control"
                    name="aplicacoes"
                    value={produtoEntity.aplicacoes && produtoEntity.aplicacoes.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {veiculos
                      ? veiculos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="produto-listAvaliacao">
                    <Translate contentKey="ecommerceApp.produto.listAvaliacao">List Avaliacao</Translate>
                  </Label>
                  <AvInput
                    id="produto-listAvaliacao"
                    type="select"
                    multiple
                    className="form-control"
                    name="listAvaliacaos"
                    value={produtoEntity.listAvaliacaos && produtoEntity.listAvaliacaos.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {avaliacaos
                      ? avaliacaos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/produto" replace color="info">
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
  marcas: storeState.marca.entities,
  fotos: storeState.foto.entities,
  veiculos: storeState.veiculo.entities,
  avaliacaos: storeState.avaliacao.entities,
  vendedors: storeState.vendedor.entities,
  produtoEntity: storeState.produto.entity,
  loading: storeState.produto.loading,
  updating: storeState.produto.updating,
  updateSuccess: storeState.produto.updateSuccess
});

const mapDispatchToProps = {
  getMarcas,
  getFotos,
  getVeiculos,
  getAvaliacaos,
  getVendedors,
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
)(ProdutoUpdate);
