import { element, by, ElementFinder } from 'protractor';

export default class ClienteUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.cliente.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#cliente-nome'));
  cpfInput: ElementFinder = element(by.css('input#cliente-cpf'));
  rgInput: ElementFinder = element(by.css('input#cliente-rg'));
  dataNascimentoInput: ElementFinder = element(by.css('input#cliente-dataNascimento'));
  telefoneInput: ElementFinder = element(by.css('input#cliente-telefone'));
  celularInput: ElementFinder = element(by.css('input#cliente-celular'));
  carrinhoSelect: ElementFinder = element(by.css('select#cliente-carrinho'));
  usuarioSelect: ElementFinder = element(by.css('select#cliente-usuario'));
  listVeiculosSelect: ElementFinder = element(by.css('select#cliente-listVeiculos'));
  listEnderecoSelect: ElementFinder = element(by.css('select#cliente-listEndereco'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setCpfInput(cpf) {
    await this.cpfInput.sendKeys(cpf);
  }

  async getCpfInput() {
    return this.cpfInput.getAttribute('value');
  }

  async setRgInput(rg) {
    await this.rgInput.sendKeys(rg);
  }

  async getRgInput() {
    return this.rgInput.getAttribute('value');
  }

  async setDataNascimentoInput(dataNascimento) {
    await this.dataNascimentoInput.sendKeys(dataNascimento);
  }

  async getDataNascimentoInput() {
    return this.dataNascimentoInput.getAttribute('value');
  }

  async setTelefoneInput(telefone) {
    await this.telefoneInput.sendKeys(telefone);
  }

  async getTelefoneInput() {
    return this.telefoneInput.getAttribute('value');
  }

  async setCelularInput(celular) {
    await this.celularInput.sendKeys(celular);
  }

  async getCelularInput() {
    return this.celularInput.getAttribute('value');
  }

  async carrinhoSelectLastOption() {
    await this.carrinhoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async carrinhoSelectOption(option) {
    await this.carrinhoSelect.sendKeys(option);
  }

  getCarrinhoSelect() {
    return this.carrinhoSelect;
  }

  async getCarrinhoSelectedOption() {
    return this.carrinhoSelect.element(by.css('option:checked')).getText();
  }

  async usuarioSelectLastOption() {
    await this.usuarioSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async usuarioSelectOption(option) {
    await this.usuarioSelect.sendKeys(option);
  }

  getUsuarioSelect() {
    return this.usuarioSelect;
  }

  async getUsuarioSelectedOption() {
    return this.usuarioSelect.element(by.css('option:checked')).getText();
  }

  async listVeiculosSelectLastOption() {
    await this.listVeiculosSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listVeiculosSelectOption(option) {
    await this.listVeiculosSelect.sendKeys(option);
  }

  getListVeiculosSelect() {
    return this.listVeiculosSelect;
  }

  async getListVeiculosSelectedOption() {
    return this.listVeiculosSelect.element(by.css('option:checked')).getText();
  }

  async listEnderecoSelectLastOption() {
    await this.listEnderecoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listEnderecoSelectOption(option) {
    await this.listEnderecoSelect.sendKeys(option);
  }

  getListEnderecoSelect() {
    return this.listEnderecoSelect;
  }

  async getListEnderecoSelectedOption() {
    return this.listEnderecoSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
