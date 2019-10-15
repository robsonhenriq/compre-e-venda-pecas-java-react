import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './produto.reducer';
import { IProduto } from 'app/shared/model/produto.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProdutoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProdutoDetail extends React.Component<IProdutoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { produtoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.produto.detail.title">Produto</Translate> [<b>{produtoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="codigoOriginal">
                <Translate contentKey="ecommerceApp.produto.codigoOriginal">Codigo Original</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.codigoOriginal}</dd>
            <dt>
              <span id="fabricante">
                <Translate contentKey="ecommerceApp.produto.fabricante">Fabricante</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.fabricante}</dd>
            <dt>
              <span id="descricao">
                <Translate contentKey="ecommerceApp.produto.descricao">Descricao</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.descricao}</dd>
            <dt>
              <span id="ehUsado">
                <Translate contentKey="ecommerceApp.produto.ehUsado">Eh Usado</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.ehUsado ? 'true' : 'false'}</dd>
            <dt>
              <span id="quantidadeDisponivel">
                <Translate contentKey="ecommerceApp.produto.quantidadeDisponivel">Quantidade Disponivel</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.quantidadeDisponivel}</dd>
            <dt>
              <span id="altura">
                <Translate contentKey="ecommerceApp.produto.altura">Altura</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.altura}</dd>
            <dt>
              <span id="largura">
                <Translate contentKey="ecommerceApp.produto.largura">Largura</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.largura}</dd>
            <dt>
              <span id="pesoBruto">
                <Translate contentKey="ecommerceApp.produto.pesoBruto">Peso Bruto</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.pesoBruto}</dd>
            <dt>
              <span id="precoAVista">
                <Translate contentKey="ecommerceApp.produto.precoAVista">Preco A Vista</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.precoAVista}</dd>
            <dt>
              <span id="precoAPrazo">
                <Translate contentKey="ecommerceApp.produto.precoAPrazo">Preco A Prazo</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.precoAPrazo}</dd>
            <dt>
              <span id="categoria">
                <Translate contentKey="ecommerceApp.produto.categoria">Categoria</Translate>
              </span>
            </dt>
            <dd>{produtoEntity.categoria}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.produto.marca">Marca</Translate>
            </dt>
            <dd>{produtoEntity.marcaId ? produtoEntity.marcaId : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.produto.listImagens">List Imagens</Translate>
            </dt>
            <dd>
              {produtoEntity.listImagens
                ? produtoEntity.listImagens.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === produtoEntity.listImagens.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="ecommerceApp.produto.aplicacoes">Aplicacoes</Translate>
            </dt>
            <dd>
              {produtoEntity.aplicacoes
                ? produtoEntity.aplicacoes.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === produtoEntity.aplicacoes.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="ecommerceApp.produto.listAvaliacao">List Avaliacao</Translate>
            </dt>
            <dd>
              {produtoEntity.listAvaliacaos
                ? produtoEntity.listAvaliacaos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === produtoEntity.listAvaliacaos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/produto" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/produto/${produtoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ produto }: IRootState) => ({
  produtoEntity: produto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProdutoDetail);
