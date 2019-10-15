import { element, by, ElementFinder } from 'protractor';

export default class VendedorUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.vendedor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ehEmpresaInput: ElementFinder = element(by.css('input#vendedor-ehEmpresa'));
  razaoSocialInput: ElementFinder = element(by.css('input#vendedor-razaoSocial'));
  cnpjInput: ElementFinder = element(by.css('input#vendedor-cnpj'));
  cpfInput: ElementFinder = element(by.css('input#vendedor-cpf'));
  dataCadastroInput: ElementFinder = element(by.css('input#vendedor-dataCadastro'));
  dataNascimentoInput: ElementFinder = element(by.css('input#vendedor-dataNascimento'));
  descricaoInput: ElementFinder = element(by.css('input#vendedor-descricao'));
  usuarioSelect: ElementFinder = element(by.css('select#vendedor-usuario'));
  enderecoSelect: ElementFinder = element(by.css('select#vendedor-endereco'));
  listProdutosSelect: ElementFinder = element(by.css('select#vendedor-listProdutos'));

  getPageTitle() {
    return this.pageTitle;
  }

  getEhEmpresaInput() {
    return this.ehEmpresaInput;
  }
  async setRazaoSocialInput(razaoSocial) {
    await this.razaoSocialInput.sendKeys(razaoSocial);
  }

  async getRazaoSocialInput() {
    return this.razaoSocialInput.getAttribute('value');
  }

  async setCnpjInput(cnpj) {
    await this.cnpjInput.sendKeys(cnpj);
  }

  async getCnpjInput() {
    return this.cnpjInput.getAttribute('value');
  }

  async setCpfInput(cpf) {
    await this.cpfInput.sendKeys(cpf);
  }

  async getCpfInput() {
    return this.cpfInput.getAttribute('value');
  }

  async setDataCadastroInput(dataCadastro) {
    await this.dataCadastroInput.sendKeys(dataCadastro);
  }

  async getDataCadastroInput() {
    return this.dataCadastroInput.getAttribute('value');
  }

  async setDataNascimentoInput(dataNascimento) {
    await this.dataNascimentoInput.sendKeys(dataNascimento);
  }

  async getDataNascimentoInput() {
    return this.dataNascimentoInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
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

  async enderecoSelectLastOption() {
    await this.enderecoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async enderecoSelectOption(option) {
    await this.enderecoSelect.sendKeys(option);
  }

  getEnderecoSelect() {
    return this.enderecoSelect;
  }

  async getEnderecoSelectedOption() {
    return this.enderecoSelect.element(by.css('option:checked')).getText();
  }

  async listProdutosSelectLastOption() {
    await this.listProdutosSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listProdutosSelectOption(option) {
    await this.listProdutosSelect.sendKeys(option);
  }

  getListProdutosSelect() {
    return this.listProdutosSelect;
  }

  async getListProdutosSelectedOption() {
    return this.listProdutosSelect.element(by.css('option:checked')).getText();
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
