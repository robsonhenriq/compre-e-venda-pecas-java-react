import { element, by, ElementFinder } from 'protractor';

export default class VeiculoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.veiculo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#veiculo-nome'));
  anoInput: ElementFinder = element(by.css('input#veiculo-ano'));
  marcaSelect: ElementFinder = element(by.css('select#veiculo-marca'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setAnoInput(ano) {
    await this.anoInput.sendKeys(ano);
  }

  async getAnoInput() {
    return this.anoInput.getAttribute('value');
  }

  async marcaSelectLastOption() {
    await this.marcaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async marcaSelectOption(option) {
    await this.marcaSelect.sendKeys(option);
  }

  getMarcaSelect() {
    return this.marcaSelect;
  }

  async getMarcaSelectedOption() {
    return this.marcaSelect.element(by.css('option:checked')).getText();
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
