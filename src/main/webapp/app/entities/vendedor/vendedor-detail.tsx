import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './vendedor.reducer';
import { IVendedor } from 'app/shared/model/vendedor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVendedorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VendedorDetail extends React.Component<IVendedorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vendedorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.vendedor.detail.title">Vendedor</Translate> [<b>{vendedorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="ehEmpresa">
                <Translate contentKey="ecommerceApp.vendedor.ehEmpresa">Eh Empresa</Translate>
              </span>
            </dt>
            <dd>{vendedorEntity.ehEmpresa ? 'true' : 'false'}</dd>
            <dt>
              <span id="razaoSocial">
                <Translate contentKey="ecommerceApp.vendedor.razaoSocial">Razao Social</Translate>
              </span>
            </dt>
            <dd>{vendedorEntity.razaoSocial}</dd>
            <dt>
              <span id="cnpj">
                <Translate contentKey="ecommerceApp.vendedor.cnpj">Cnpj</Translate>
              </span>
            </dt>
            <dd>{vendedorEntity.cnpj}</dd>
            <dt>
              <span id="cpf">
                <Translate contentKey="ecommerceApp.vendedor.cpf">Cpf</Translate>
              </span>
            </dt>
            <dd>{vendedorEntity.cpf}</dd>
            <dt>
              <span id="dataCadastro">
                <Translate contentKey="ecommerceApp.vendedor.dataCadastro">Data Cadastro</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={vendedorEntity.dataCadastro} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dataNascimento">
                <Translate contentKey="ecommerceApp.vendedor.dataNascimento">Data Nascimento</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={vendedorEntity.dataNascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="descricao">
                <Translate contentKey="ecommerceApp.vendedor.descricao">Descricao</Translate>
              </span>
            </dt>
            <dd>{vendedorEntity.descricao}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.vendedor.usuario">Usuario</Translate>
            </dt>
            <dd>{vendedorEntity.usuario ? vendedorEntity.usuario.id : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.vendedor.endereco">Endereco</Translate>
            </dt>
            <dd>{vendedorEntity.endereco ? vendedorEntity.endereco.id : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.vendedor.listProdutos">List Produtos</Translate>
            </dt>
            <dd>
              {vendedorEntity.listProdutos
                ? vendedorEntity.listProdutos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === vendedorEntity.listProdutos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/vendedor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/vendedor/${vendedorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ vendedor }: IRootState) => ({
  vendedorEntity: vendedor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendedorDetail);
