import { element, by, ElementFinder } from 'protractor';

export default class EnderecoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.endereco.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ruaInput: ElementFinder = element(by.css('input#endereco-rua'));
  bairroInput: ElementFinder = element(by.css('input#endereco-bairro'));
  complementoInput: ElementFinder = element(by.css('input#endereco-complemento'));
  numeroInput: ElementFinder = element(by.css('input#endereco-numero'));
  cidadeInput: ElementFinder = element(by.css('input#endereco-cidade'));
  cepInput: ElementFinder = element(by.css('input#endereco-cep'));
  estadoSelect: ElementFinder = element(by.css('select#endereco-estado'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRuaInput(rua) {
    await this.ruaInput.sendKeys(rua);
  }

  async getRuaInput() {
    return this.ruaInput.getAttribute('value');
  }

  async setBairroInput(bairro) {
    await this.bairroInput.sendKeys(bairro);
  }

  async getBairroInput() {
    return this.bairroInput.getAttribute('value');
  }

  async setComplementoInput(complemento) {
    await this.complementoInput.sendKeys(complemento);
  }

  async getComplementoInput() {
    return this.complementoInput.getAttribute('value');
  }

  async setNumeroInput(numero) {
    await this.numeroInput.sendKeys(numero);
  }

  async getNumeroInput() {
    return this.numeroInput.getAttribute('value');
  }

  async setCidadeInput(cidade) {
    await this.cidadeInput.sendKeys(cidade);
  }

  async getCidadeInput() {
    return this.cidadeInput.getAttribute('value');
  }

  async setCepInput(cep) {
    await this.cepInput.sendKeys(cep);
  }

  async getCepInput() {
    return this.cepInput.getAttribute('value');
  }

  async setEstadoSelect(estado) {
    await this.estadoSelect.sendKeys(estado);
  }

  async getEstadoSelect() {
    return this.estadoSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption() {
    await this.estadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
