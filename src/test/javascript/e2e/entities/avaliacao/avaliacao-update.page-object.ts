import { element, by, ElementFinder } from 'protractor';

export default class AvaliacaoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.avaliacao.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataHoraInput: ElementFinder = element(by.css('input#avaliacao-dataHora'));
  descricaoInput: ElementFinder = element(by.css('input#avaliacao-descricao'));
  listClientesSelect: ElementFinder = element(by.css('select#avaliacao-listClientes'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDataHoraInput(dataHora) {
    await this.dataHoraInput.sendKeys(dataHora);
  }

  async getDataHoraInput() {
    return this.dataHoraInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  async listClientesSelectLastOption() {
    await this.listClientesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listClientesSelectOption(option) {
    await this.listClientesSelect.sendKeys(option);
  }

  getListClientesSelect() {
    return this.listClientesSelect;
  }

  async getListClientesSelectedOption() {
    return this.listClientesSelect.element(by.css('option:checked')).getText();
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
