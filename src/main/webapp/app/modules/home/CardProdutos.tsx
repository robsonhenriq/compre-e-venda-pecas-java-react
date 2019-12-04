import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { UncontrolledCarousel, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getMarcas } from 'app/entities/marca/marca.reducer';
import { getEntities as getFotos } from 'app/entities/foto/foto.reducer';
import { getEntities as getVeiculos } from 'app/entities/veiculo/veiculo.reducer';
import { getEntities as getAvaliacaos } from 'app/entities/avaliacao/avaliacao.reducer';
import { IVendedor } from 'app/shared/model/vendedor.model';
import { getEntities as getVendedors } from 'app/entities/vendedor/vendedor.reducer';
import { getEntity, updateEntity, createEntity, reset } from '../../entities/produto/produto.reducer';
import { IProduto } from 'app/shared/model/produto.model';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { isListNull, isObjectNull } from 'app/shared/util/verificacoes-utils';
import { IItem } from 'app/shared/model/item.model';
import { createEntity as saveItem } from 'app/entities/item/item.reducer';
import { createEntity as saveCarrinhoItem } from 'app/entities/carrinho/carrinho.reducer';

export interface IProdutoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

// RouteComponentProps<{ id: string; title: string; marca: string; precoAVista: any }> {}

export interface IProdutoUpdateState {
  isNew: boolean;
  idslistFotos: any[];
  idsaplicacoes: any[];
  idslistAvaliacao: any[];
  marcaId: string;
  listVendedoresId: string;
}

// CardDeProdutos para ser mostrado na tela HOME
export class CardProdutos extends React.Component<IProdutoUpdateProps, IProdutoUpdateState> {
  constructor(props) {
    super(props);
    // this.props.saveItem.bind(this);
    // this.handleClick = this.handleClick.bind(this)
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { produtoEntity } = this.props;

      const itemToSave: IItem = {
        valorTotal: produtoEntity.precoAVista,
        valorItem: produtoEntity.precoAVista,
        quantidade: 1,
        produto: {
          id: produtoEntity.id
        },
        carrinho: {
          id: null
        }
      };

      this.props.saveItem(itemToSave);
    }
  };

  render() {
    // const { produtoEntity, marcas, fotos, veiculos, avaliacaos, vendedors, loading, updating } = this.props;
    const { produtoEntity } = this.props;

    return (
      <Fragment>
        <AvForm className="col-4 col-md-4 col-lg-4" model={produtoEntity} onSubmit={this.saveEntity}>
          <Card>
            <CardImg
              top
              width="318px"
              height="180px"
              src={`data:${isListNull(produtoEntity.listFotos)[0].imagemContentType};base64,${
                isListNull(produtoEntity.listFotos)[0].imagem
              }`}
              alt="Foto do produto"
            />
            {/* {this.props.fotos} */}
            <CardBody>
              <CardTitle>
                {/* <b>Produto:</b> {this.props.title} */}
                <b>Produto:</b> {isObjectNull(this.props.produtoEntity).descricao}
              </CardTitle>

              {this.props.produtoEntity.marca && (
                <CardSubtitle>
                  <b>Marca:</b> {this.props.produtoEntity.marca.nome}
                </CardSubtitle>
              )}

              <CardText>
                <Fragment>
                  <b>Preço Á Vista R$: </b> {this.props.produtoEntity.precoAVista}
                </Fragment>

                <hr />

                {/* BTN adicionar produto no carrinho */}
                <div className="d-flex justify-content-center">
                  {/* <a tag={Link} to={`entity/carrinho`} className="btn btn-success btn-sm ml-12 "> */}
                  {/* <Button tag={Link} type="submit" to={`entity/carrinho`} className="btn btn-success btn-sm ml-12 " size="sm"> */}
                  <Button type="submit" className="btn btn-success btn-sm ml-12 " size="sm">
                    <span className="btn btn-success btn-sm ml-6" id="spanAdicionarProdutoCarrinho">
                      Adicionar ao carrinho <FontAwesomeIcon icon={faShoppingCart} />
                    </span>
                    {/* </a> */}
                  </Button>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </AvForm>
      </Fragment>
    );
    // );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  marcas: storeState.marca.entities,
  fotos: storeState.foto.entities,
  veiculos: storeState.veiculo.entities,
  avaliacaos: storeState.avaliacao.entities,
  vendedors: storeState.vendedor.entities,
  produtoEntity: storeState.produto.entity,
  // itemEntity: storeState.item.entity,
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
  saveItem,
  saveCarrinhoItem,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardProdutos);
