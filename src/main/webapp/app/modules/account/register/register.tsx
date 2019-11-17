import React, { Fragment, useState } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button, ButtonGroup, FormGroup, Label, Input } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';
import { CamposVendedor } from './camposVendedor';

export interface IRegisterProps extends StateProps, DispatchProps {}

export interface IRegisterState {
  password: string;
}

export class RegisterPage extends React.Component<IRegisterProps, IRegisterState> {
  state: IRegisterState = {
    password: ''
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handleRegister(
      values.nome,
      values.username,
      values.email,
      values.firstPassword,
      values.rg,
      values.cpf,
      values.telefone,
      values.celular,
      values.dataNascimento,
      values.razaoSocial,
      values.cnpj,
      this.props.currentLocale
    );
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="register-title">
              <Translate contentKey="register.title">Registration</Translate>
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm id="register-form" onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="nome"
                label={translate('global.form.nome.label')}
                placeholder={translate('global.form.nome.placeholder')}
                validate={{
                  required: { value: true, errorMessage: translate('register.messages.validate.nome.required') },
                  minLength: { value: 1, errorMessage: translate('register.messages.validate.nome.minlength') },
                  maxLength: { value: 50, errorMessage: translate('register.messages.validate.nome.maxlength') }
                }}
              />

              <Row>
                <Col xs="4" sm="4" md="4" lg="4">
                  <AvField
                    name="username"
                    label={translate('global.form.username.label')}
                    placeholder={translate('global.form.username.placeholder')}
                    validate={{
                      required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                      pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: translate('register.messages.validate.login.pattern') },
                      minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                      maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') }
                    }}
                  />
                </Col>

                <Col xs="8" sm="8" md="8" lg="8">
                  <AvField
                    name="email"
                    label={translate('global.form.email.label')}
                    placeholder={translate('global.form.email.placeholder')}
                    type="email"
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                      minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                      maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs="6" sm="6" md="6" lg="6">
                  <AvField
                    name="firstPassword"
                    label={translate('global.form.newpassword.label')}
                    placeholder={translate('global.form.newpassword.placeholder')}
                    type="password"
                    onChange={this.updatePassword}
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                    }}
                  />
                  <PasswordStrengthBar password={this.state.password} />
                </Col>

                <Col xs="6" sm="6" md="6" lg="6">
                  <AvField
                    name="secondPassword"
                    label={translate('global.form.confirmpassword.label')}
                    placeholder={translate('global.form.confirmpassword.placeholder')}
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                      minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                      maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                      match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') }
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs="4" sm="4" md="4" lg="4">
                  <AvField name="cpf" label={translate('global.form.cpf.label')} placeholder={translate('global.form.cpf.placeholder')} />
                </Col>

                <Col xs="4" sm="4" md="4" lg="4">
                  <AvField name="rg" label={translate('global.form.rg.label')} placeholder={translate('global.form.rg.placeholder')} />
                </Col>

                <Col xs="4" sm="4" md="4" lg="4">
                  <Label for="exampleDate">Data de nascimento</Label>
                  <Input name="dataNascimento" type="date" id="dataNascimento" placeholder="Informe sua data de nascimento" />
                </Col>
              </Row>

              <Row>
                <Col xs="4" sm="4" md="4" lg="4">
                  <Label id="telefoneLabel" for="cliente-telefone">
                    <Translate contentKey="ecommerceApp.cliente.telefone">Telefone</Translate>
                  </Label>
                  <AvField
                    id="cliente-telefone"
                    type="text"
                    name="telefone"
                    validate={{
                      minLength: { value: 10, errorMessage: 'O telefone tem que ter 10 números contando com o DDD' },
                      maxLength: { value: 10, errorMessage: 'O telefone tem que ter 10 números contando com o DDD' }
                    }}
                  />
                </Col>

                <Col xs="4" sm="4" md="4" lg="4">
                  <Label id="celularLabel" for="cliente-celular">
                    <Translate contentKey="ecommerceApp.cliente.celular">Celular</Translate>
                  </Label>
                  <AvField
                    id="cliente-celular"
                    type="text"
                    name="celular"
                    validate={{
                      minLength: { value: 10, errorMessage: 'O CELULAR tem que ter 10~11 números contando com o DDD' },
                      maxLength: { value: 11, errorMessage: 'O CELULAR tem que ter 10~11 números contando com o DDD' }
                    }}
                  />
                </Col>

                {/* CAMPOS VENDEDOR */}
                <Col xs="12" sm="12" md="12" lg="12">
                  <CamposVendedor />
                </Col>

                {/* <RadioButtons /> */}
              </Row>

              <Button id="register-submit" color="primary" type="submit">
                <Translate contentKey="register.form.button">Register</Translate>
              </Button>
            </AvForm>
            <p>&nbsp;</p>

            <Alert color="warning">
              <span>
                <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
              </span>
              <a className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </a>
              <span>
                <Translate contentKey="global.messages.info.authenticated.suffix">
                  , you can try the default accounts:
                  <br />- Administrator (login="admin" and password="admin")
                  <br />- User (login="user" and password="user").
                </Translate>
              </span>
            </Alert>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
