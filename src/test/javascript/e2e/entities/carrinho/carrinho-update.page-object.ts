import { element, by, ElementFinder } from 'protractor';

export default class CarrinhoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.carrinho.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  totalCarrinhoInput: ElementFinder = element(by.css('input#carrinho-totalCarrinho'));
  listItensSelect: ElementFinder = element(by.css('select#carrinho-listItens'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTotalCarrinhoInput(totalCarrinho) {
    await this.totalCarrinhoInput.sendKeys(totalCarrinho);
  }

  async getTotalCarrinhoInput() {
    return this.totalCarrinhoInput.getAttribute('value');
  }

  async listItensSelectLastOption() {
    await this.listItensSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listItensSelectOption(option) {
    await this.listItensSelect.sendKeys(option);
  }

  getListItensSelect() {
    return this.listItensSelect;
  }

  async getListItensSelectedOption() {
    return this.listItensSelect.element(by.css('option:checked')).getText();
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
