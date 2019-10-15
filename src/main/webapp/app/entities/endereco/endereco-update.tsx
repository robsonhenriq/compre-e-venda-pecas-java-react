import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/endereco.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnderecoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEnderecoUpdateState {
  isNew: boolean;
}

export class EnderecoUpdate extends React.Component<IEnderecoUpdateProps, IEnderecoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { enderecoEntity } = this.props;
      const entity = {
        ...enderecoEntity,
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
    this.props.history.push('/entity/endereco');
  };

  render() {
    const { enderecoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ecommerceApp.endereco.home.createOrEditLabel">
              <Translate contentKey="ecommerceApp.endereco.home.createOrEditLabel">Create or edit a Endereco</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : enderecoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="endereco-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="endereco-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ruaLabel" for="endereco-rua">
                    <Translate contentKey="ecommerceApp.endereco.rua">Rua</Translate>
                  </Label>
                  <AvField
                    id="endereco-rua"
                    type="text"
                    name="rua"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bairroLabel" for="endereco-bairro">
                    <Translate contentKey="ecommerceApp.endereco.bairro">Bairro</Translate>
                  </Label>
                  <AvField id="endereco-bairro" type="text" name="bairro" />
                </AvGroup>
                <AvGroup>
                  <Label id="complementoLabel" for="endereco-complemento">
                    <Translate contentKey="ecommerceApp.endereco.complemento">Complemento</Translate>
                  </Label>
                  <AvField id="endereco-complemento" type="text" name="complemento" />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroLabel" for="endereco-numero">
                    <Translate contentKey="ecommerceApp.endereco.numero">Numero</Translate>
                  </Label>
                  <AvField id="endereco-numero" type="string" className="form-control" name="numero" />
                </AvGroup>
                <AvGroup>
                  <Label id="cidadeLabel" for="endereco-cidade">
                    <Translate contentKey="ecommerceApp.endereco.cidade">Cidade</Translate>
                  </Label>
                  <AvField id="endereco-cidade" type="text" name="cidade" />
                </AvGroup>
                <AvGroup>
                  <Label id="cepLabel" for="endereco-cep">
                    <Translate contentKey="ecommerceApp.endereco.cep">Cep</Translate>
                  </Label>
                  <AvField
                    id="endereco-cep"
                    type="text"
                    name="cep"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="estadoLabel" for="endereco-estado">
                    <Translate contentKey="ecommerceApp.endereco.estado">Estado</Translate>
                  </Label>
                  <AvInput
                    id="endereco-estado"
                    type="select"
                    className="form-control"
                    name="estado"
                    value={(!isNew && enderecoEntity.estado) || 'AC'}
                  >
                    <option value="AC">{translate('ecommerceApp.Estado.AC')}</option>
                    <option value="AL">{translate('ecommerceApp.Estado.AL')}</option>
                    <option value="AP">{translate('ecommerceApp.Estado.AP')}</option>
                    <option value="AM">{translate('ecommerceApp.Estado.AM')}</option>
                    <option value="BA">{translate('ecommerceApp.Estado.BA')}</option>
                    <option value="CE">{translate('ecommerceApp.Estado.CE')}</option>
                    <option value="DF">{translate('ecommerceApp.Estado.DF')}</option>
                    <option value="ES">{translate('ecommerceApp.Estado.ES')}</option>
                    <option value="GO">{translate('ecommerceApp.Estado.GO')}</option>
                    <option value="MA">{translate('ecommerceApp.Estado.MA')}</option>
                    <option value="MT">{translate('ecommerceApp.Estado.MT')}</option>
                    <option value="MS">{translate('ecommerceApp.Estado.MS')}</option>
                    <option value="MG">{translate('ecommerceApp.Estado.MG')}</option>
                    <option value="PA">{translate('ecommerceApp.Estado.PA')}</option>
                    <option value="PB">{translate('ecommerceApp.Estado.PB')}</option>
                    <option value="PR">{translate('ecommerceApp.Estado.PR')}</option>
                    <option value="PE">{translate('ecommerceApp.Estado.PE')}</option>
                    <option value="PI">{translate('ecommerceApp.Estado.PI')}</option>
                    <option value="RJ">{translate('ecommerceApp.Estado.RJ')}</option>
                    <option value="RN">{translate('ecommerceApp.Estado.RN')}</option>
                    <option value="RS">{translate('ecommerceApp.Estado.RS')}</option>
                    <option value="RO">{translate('ecommerceApp.Estado.RO')}</option>
                    <option value="RR">{translate('ecommerceApp.Estado.RR')}</option>
                    <option value="SC">{translate('ecommerceApp.Estado.SC')}</option>
                    <option value="SP">{translate('ecommerceApp.Estado.SP')}</option>
                    <option value="SE">{translate('ecommerceApp.Estado.SE')}</option>
                    <option value="TO">{translate('ecommerceApp.Estado.TO')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/endereco" replace color="info">
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
  enderecoEntity: storeState.endereco.entity,
  loading: storeState.endereco.loading,
  updating: storeState.endereco.updating,
  updateSuccess: storeState.endereco.updateSuccess
});

const mapDispatchToProps = {
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
)(EnderecoUpdate);
