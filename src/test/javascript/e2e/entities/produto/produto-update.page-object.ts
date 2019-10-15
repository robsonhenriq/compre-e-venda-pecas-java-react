import { element, by, ElementFinder } from 'protractor';

export default class ProdutoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.produto.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codigoOriginalInput: ElementFinder = element(by.css('input#produto-codigoOriginal'));
  fabricanteInput: ElementFinder = element(by.css('input#produto-fabricante'));
  descricaoInput: ElementFinder = element(by.css('input#produto-descricao'));
  ehUsadoInput: ElementFinder = element(by.css('input#produto-ehUsado'));
  quantidadeDisponivelInput: ElementFinder = element(by.css('input#produto-quantidadeDisponivel'));
  alturaInput: ElementFinder = element(by.css('input#produto-altura'));
  larguraInput: ElementFinder = element(by.css('input#produto-largura'));
  pesoBrutoInput: ElementFinder = element(by.css('input#produto-pesoBruto'));
  precoAVistaInput: ElementFinder = element(by.css('input#produto-precoAVista'));
  precoAPrazoInput: ElementFinder = element(by.css('input#produto-precoAPrazo'));
  categoriaSelect: ElementFinder = element(by.css('select#produto-categoria'));
  marcaSelect: ElementFinder = element(by.css('select#produto-marca'));
  listImagensSelect: ElementFinder = element(by.css('select#produto-listImagens'));
  aplicacoesSelect: ElementFinder = element(by.css('select#produto-aplicacoes'));
  listAvaliacaoSelect: ElementFinder = element(by.css('select#produto-listAvaliacao'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodigoOriginalInput(codigoOriginal) {
    await this.codigoOriginalInput.sendKeys(codigoOriginal);
  }

  async getCodigoOriginalInput() {
    return this.codigoOriginalInput.getAttribute('value');
  }

  async setFabricanteInput(fabricante) {
    await this.fabricanteInput.sendKeys(fabricante);
  }

  async getFabricanteInput() {
    return this.fabricanteInput.getAttribute('value');
  }

  async setDescricaoInput(descricao) {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput() {
    return this.descricaoInput.getAttribute('value');
  }

  getEhUsadoInput() {
    return this.ehUsadoInput;
  }
  async setQuantidadeDisponivelInput(quantidadeDisponivel) {
    await this.quantidadeDisponivelInput.sendKeys(quantidadeDisponivel);
  }

  async getQuantidadeDisponivelInput() {
    return this.quantidadeDisponivelInput.getAttribute('value');
  }

  async setAlturaInput(altura) {
    await this.alturaInput.sendKeys(altura);
  }

  async getAlturaInput() {
    return this.alturaInput.getAttribute('value');
  }

  async setLarguraInput(largura) {
    await this.larguraInput.sendKeys(largura);
  }

  async getLarguraInput() {
    return this.larguraInput.getAttribute('value');
  }

  async setPesoBrutoInput(pesoBruto) {
    await this.pesoBrutoInput.sendKeys(pesoBruto);
  }

  async getPesoBrutoInput() {
    return this.pesoBrutoInput.getAttribute('value');
  }

  async setPrecoAVistaInput(precoAVista) {
    await this.precoAVistaInput.sendKeys(precoAVista);
  }

  async getPrecoAVistaInput() {
    return this.precoAVistaInput.getAttribute('value');
  }

  async setPrecoAPrazoInput(precoAPrazo) {
    await this.precoAPrazoInput.sendKeys(precoAPrazo);
  }

  async getPrecoAPrazoInput() {
    return this.precoAPrazoInput.getAttribute('value');
  }

  async setCategoriaSelect(categoria) {
    await this.categoriaSelect.sendKeys(categoria);
  }

  async getCategoriaSelect() {
    return this.categoriaSelect.element(by.css('option:checked')).getText();
  }

  async categoriaSelectLastOption() {
    await this.categoriaSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async listImagensSelectLastOption() {
    await this.listImagensSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listImagensSelectOption(option) {
    await this.listImagensSelect.sendKeys(option);
  }

  getListImagensSelect() {
    return this.listImagensSelect;
  }

  async getListImagensSelectedOption() {
    return this.listImagensSelect.element(by.css('option:checked')).getText();
  }

  async aplicacoesSelectLastOption() {
    await this.aplicacoesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async aplicacoesSelectOption(option) {
    await this.aplicacoesSelect.sendKeys(option);
  }

  getAplicacoesSelect() {
    return this.aplicacoesSelect;
  }

  async getAplicacoesSelectedOption() {
    return this.aplicacoesSelect.element(by.css('option:checked')).getText();
  }

  async listAvaliacaoSelectLastOption() {
    await this.listAvaliacaoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async listAvaliacaoSelectOption(option) {
    await this.listAvaliacaoSelect.sendKeys(option);
  }

  getListAvaliacaoSelect() {
    return this.listAvaliacaoSelect;
  }

  async getListAvaliacaoSelectedOption() {
    return this.listAvaliacaoSelect.element(by.css('option:checked')).getText();
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
