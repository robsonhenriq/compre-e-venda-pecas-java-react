import { element, by, ElementFinder } from 'protractor';

export default class ItemUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.item.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valorTotalInput: ElementFinder = element(by.css('input#item-valorTotal'));
  valorItemInput: ElementFinder = element(by.css('input#item-valorItem'));
  quantidadeInput: ElementFinder = element(by.css('input#item-quantidade'));
  produtoSelect: ElementFinder = element(by.css('select#item-produto'));
  vendaSelect: ElementFinder = element(by.css('select#item-venda'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValorTotalInput(valorTotal) {
    await this.valorTotalInput.sendKeys(valorTotal);
  }

  async getValorTotalInput() {
    return this.valorTotalInput.getAttribute('value');
  }

  async setValorItemInput(valorItem) {
    await this.valorItemInput.sendKeys(valorItem);
  }

  async getValorItemInput() {
    return this.valorItemInput.getAttribute('value');
  }

  async setQuantidadeInput(quantidade) {
    await this.quantidadeInput.sendKeys(quantidade);
  }

  async getQuantidadeInput() {
    return this.quantidadeInput.getAttribute('value');
  }

  async produtoSelectLastOption() {
    await this.produtoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async produtoSelectOption(option) {
    await this.produtoSelect.sendKeys(option);
  }

  getProdutoSelect() {
    return this.produtoSelect;
  }

  async getProdutoSelectedOption() {
    return this.produtoSelect.element(by.css('option:checked')).getText();
  }

  async vendaSelectLastOption() {
    await this.vendaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async vendaSelectOption(option) {
    await this.vendaSelect.sendKeys(option);
  }

  getVendaSelect() {
    return this.vendaSelect;
  }

  async getVendaSelectedOption() {
    return this.vendaSelect.element(by.css('option:checked')).getText();
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
