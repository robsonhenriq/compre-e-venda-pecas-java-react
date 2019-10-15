import { element, by, ElementFinder } from 'protractor';

export default class FotoUpdatePage {
  pageTitle: ElementFinder = element(by.id('ecommerceApp.foto.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomeInput: ElementFinder = element(by.css('input#foto-nome'));
  imagemInput: ElementFinder = element(by.css('input#file_imagem'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomeInput(nome) {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput() {
    return this.nomeInput.getAttribute('value');
  }

  async setImagemInput(imagem) {
    await this.imagemInput.sendKeys(imagem);
  }

  async getImagemInput() {
    return this.imagemInput.getAttribute('value');
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
