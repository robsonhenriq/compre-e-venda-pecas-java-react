import React, { Fragment, Component } from 'react';
import { Translate } from 'react-jhipster';
import { AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Row, Col, Button, ButtonGroup, Label } from 'reactstrap';

// Componente com os campos "extras", especifico de vendedor
export class CamposVendedor extends Component {
  state = {
    perfil: '',
    numPerfil: null
  };

  constructor(props) {
    super(props);
    // Aqui utilizamos o `bind` para que o `this` funcione dentro da nossa callback
    this.setPerfil = this.setPerfil.bind(this);
  }

  setPerfil(perf, numPerf) {
    this.setState(() => ({
      perfil: perf,
      numPerfil: numPerf
    }));
  }

  render() {
    return (
      <Fragment>
        <h5>Selecione o perfil</h5>
        <ButtonGroup>
          <Button color="primary" onClick={this.setPerfil.bind(this, 'Cliente', 1)} active={this.state.numPerfil === 1}>
            Cliente
          </Button>
          <Button color="primary" onClick={this.setPerfil.bind(this, 'Vendedor', 2)} active={this.state.numPerfil === 2}>
            Vendedor
          </Button>
        </ButtonGroup>
        <p>Perfil Selecionado: {this.state.perfil}</p>

        {/* Se tiver selecionado VENDEDOR, mostra os campos abaixo */}
        {this.state.perfil === 'Vendedor' && (
          <Fragment>
            <Row>
              <Col xs="12" sm="12" md="12" lg="12">
                <AvGroup>
                  <Label id="ehEmpresaLabel" check>
                    <AvInput id="vendedor-ehEmpresa" type="checkbox" className="form-control" name="ehEmpresa" />
                    <Translate contentKey="ecommerceApp.vendedor.ehEmpresa">É Empresa?</Translate>
                  </Label>
                </AvGroup>

                <Label id="razaoSocialLabel" for="vendedor-razaoSocial">
                  <Translate contentKey="ecommerceApp.vendedor.razaoSocial">Razao Social</Translate>
                </Label>
                <AvField
                  id="vendedor-razaoSocial"
                  type="text"
                  name="razaoSocial"
                  validate={{
                    minLength: { value: 2, errorMessage: 'O RAZÃO SOCIAL tem que ter 2 caracteres no minímo' },
                    maxLength: { value: 60, errorMessage: 'A RAZÃO SOCIAL pode ter no máximo 60 caracteres' }
                  }}
                />
              </Col>
            </Row>

            <AvGroup>
              <Label id="cnpjLabel" for="vendedor-cnpj">
                <Translate contentKey="ecommerceApp.vendedor.cnpj">Cnpj</Translate>
              </Label>
              <AvField
                id="vendedor-cnpj"
                type="text"
                name="cnpj"
                validate={{
                  minLength: { value: 14, errorMessage: 'O CNPJ tem que ter 14 dígitos' },
                  maxLength: { value: 14, errorMessage: 'O CNPJ tem que ter 14 dígitos' }
                }}
              />
            </AvGroup>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
