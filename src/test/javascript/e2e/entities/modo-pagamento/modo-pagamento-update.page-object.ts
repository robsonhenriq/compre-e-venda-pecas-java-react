import { element, by, ElementFinder } from 'protractor';

export default class ModoPagamentoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.modoPagamento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descricaoInput: ElementFinder = element(by.css('input#modo-pagamento-descricao'));
  tipoPagamentoSelect: ElementFinder = element(by.css('select#modo-pagamento-tipoPagamento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  async setTipoPagamentoSelect(tipoPagamento) {
    await this.tipoPagamentoSelect.sendKeys(tipoPagamento);
  }

  async getTipoPagamentoSelect() {
    return this.tipoPagamentoSelect.element(by.css('option:checked')).getText();
  }

  async tipoPagamentoSelectLastOption() {
    await this.tipoPagamentoSelect
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
