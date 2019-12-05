import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity as getClienteById } from '../cliente/cliente.reducer';
import { getSession } from 'app/shared/reducers/authentication';
import { ICarrinho } from 'app/shared/model/carrinho.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity as getCarrinhoById, deleteEntity as deleteCarrinhoById } from './carrinho.reducer';
// import { deleteEntity as deleteItemById } from '../item/item.reducer';
import { deleteItemById } from '../item/item.reducer';

export interface ICarrinhoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export type ICarrinhoState = ICarrinho;

export class CarrinhoDeleteDialog extends React.Component<ICarrinhoDeleteDialogProps, ICarrinhoState> {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  componentDidMount() {
    // this.props.getCarrinhoById(this.props.match.params.id);
    this.props.getClienteById(this.props.account.id);

    this.props.getSession();
    setTimeout(() => {
      // console.log('Antes do SET state ID = ' + this.state.id);

      this.setState({ id: this.props.clienteEntity.carrinho.id });
      this.props.getCarrinhoById(this.state.id);

      // console.log('DEPOIS state ID = ' + this.state.id);
    }, 1000);
  }

  confirmDelete = event => {
    const id = {
      idItem: this.props.match.params.id,
      idCarrinho: this.props.carrinhoEntity.id
    };

    this.props.deleteItemById(id.idItem, id.idCarrinho);
    // this.props.deleteItemById(id.idItem);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { carrinhoEntity, match } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="ecommerceApp.carrinho.delete.question">
          {/* <Translate contentKey="ecommerceApp.carrinho.delete.question" interpolate={{ id: match.params.id }}> */}
          {/* Are you sure you want to delete this Carrinho? */}
          {/* </Translate> */}
          Tem certeza de que deseja excluir o item: {match.params.id} do Carrinho?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-carrinho" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ carrinho, cliente, authentication }: IRootState) => ({
  carrinhoEntity: carrinho.entity,
  clienteEntity: cliente.entity,
  account: authentication.account
});

const mapDispatchToProps = { getSession, getCarrinhoById, deleteCarrinhoById, getClienteById, deleteItemById };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarrinhoDeleteDialog);
