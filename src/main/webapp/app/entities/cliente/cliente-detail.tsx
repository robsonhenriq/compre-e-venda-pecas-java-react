import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClienteDetail extends React.Component<IClienteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clienteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="ecommerceApp.cliente.detail.title">Cliente</Translate> [<b>{clienteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="ecommerceApp.cliente.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.nome}</dd>
            <dt>
              <span id="cpf">
                <Translate contentKey="ecommerceApp.cliente.cpf">Cpf</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.cpf}</dd>
            <dt>
              <span id="rg">
                <Translate contentKey="ecommerceApp.cliente.rg">Rg</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.rg}</dd>
            <dt>
              <span id="dataNascimento">
                <Translate contentKey="ecommerceApp.cliente.dataNascimento">Data Nascimento</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={clienteEntity.dataNascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="telefone">
                <Translate contentKey="ecommerceApp.cliente.telefone">Telefone</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.telefone}</dd>
            <dt>
              <span id="celular">
                <Translate contentKey="ecommerceApp.cliente.celular">Celular</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.celular}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.cliente.carrinho">Carrinho</Translate>
            </dt>
            <dd>{clienteEntity.carrinhoId ? clienteEntity.carrinhoId : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.cliente.usuario">Usuario</Translate>
            </dt>
            <dd>{clienteEntity.usuarioId ? clienteEntity.usuarioId : ''}</dd>
            <dt>
              <Translate contentKey="ecommerceApp.cliente.listVeiculos">List Veiculos</Translate>
            </dt>
            <dd>
              {clienteEntity.listVeiculos
                ? clienteEntity.listVeiculos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === clienteEntity.listVeiculos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="ecommerceApp.cliente.listEndereco">List Endereco</Translate>
            </dt>
            <dd>
              {clienteEntity.listEnderecos
                ? clienteEntity.listEnderecos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === clienteEntity.listEnderecos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/cliente" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/cliente/${clienteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cliente }: IRootState) => ({
  clienteEntity: cliente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteDetail);
