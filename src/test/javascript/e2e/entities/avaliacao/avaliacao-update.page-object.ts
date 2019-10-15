import { element, by, ElementFinder } from 'protractor';

export default class AvaliacaoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.avaliacao.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataHoraInput: ElementFinder = element(by.css('input#avaliacao-dataHora'));
  descricaoInput: ElementFinder = element(by.css('input#avaliacao-descricao'));
  listClienteSelect: ElementFinder = element(by.css('select#avaliacao-listCliente'));

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

  async listClienteSelectLastOption() {
    await this.listClienteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listClienteSelectOption(option) {
    await this.listClienteSelect.sendKeys(option);
  }

  getListClienteSelect() {
    return this.listClienteSelect;
  }

  async getListClienteSelectedOption() {
    return this.listClienteSelect.element(by.css('option:checked')).getText();
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
