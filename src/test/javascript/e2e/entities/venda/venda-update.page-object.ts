import { element, by, ElementFinder } from 'protractor';

export default class VendaUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.venda.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataHoraInput: ElementFinder = element(by.css('input#venda-dataHora'));
  totalVendaInput: ElementFinder = element(by.css('input#venda-totalVenda'));
  compradorSelect: ElementFinder = element(by.css('select#venda-comprador'));
  enderecoEntregaSelect: ElementFinder = element(by.css('select#venda-enderecoEntrega'));
  modoPagamentoSelect: ElementFinder = element(by.css('select#venda-modoPagamento'));
  listVendedoresSelect: ElementFinder = element(by.css('select#venda-listVendedores'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDataHoraInput(dataHora) {
    await this.dataHoraInput.sendKeys(dataHora);
  }

  async getDataHoraInput() {
    return this.dataHoraInput.getAttribute('value');
  }

  async setTotalVendaInput(totalVenda) {
    await this.totalVendaInput.sendKeys(totalVenda);
  }

  async getTotalVendaInput() {
    return this.totalVendaInput.getAttribute('value');
  }

  async compradorSelectLastOption() {
    await this.compradorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async compradorSelectOption(option) {
    await this.compradorSelect.sendKeys(option);
  }

  getCompradorSelect() {
    return this.compradorSelect;
  }

  async getCompradorSelectedOption() {
    return this.compradorSelect.element(by.css('option:checked')).getText();
  }

  async enderecoEntregaSelectLastOption() {
    await this.enderecoEntregaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async enderecoEntregaSelectOption(option) {
    await this.enderecoEntregaSelect.sendKeys(option);
  }

  getEnderecoEntregaSelect() {
    return this.enderecoEntregaSelect;
  }

  async getEnderecoEntregaSelectedOption() {
    return this.enderecoEntregaSelect.element(by.css('option:checked')).getText();
  }

  async modoPagamentoSelectLastOption() {
    await this.modoPagamentoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async modoPagamentoSelectOption(option) {
    await this.modoPagamentoSelect.sendKeys(option);
  }

  getModoPagamentoSelect() {
    return this.modoPagamentoSelect;
  }

  async getModoPagamentoSelectedOption() {
    return this.modoPagamentoSelect.element(by.css('option:checked')).getText();
  }

  async listVendedoresSelectLastOption() {
    await this.listVendedoresSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listVendedoresSelectOption(option) {
    await this.listVendedoresSelect.sendKeys(option);
  }

  getListVendedoresSelect() {
    return this.listVendedoresSelect;
  }

  async getListVendedoresSelectedOption() {
    return this.listVendedoresSelect.element(by.css('option:checked')).getText();
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
