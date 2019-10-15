/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EnderecoComponentsPage from './endereco.page-object';
import { EnderecoDeleteDialog } from './endereco.page-object';
import EnderecoUpdatePage from './endereco-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Endereco e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let enderecoUpdatePage: EnderecoUpdatePage;
  let enderecoComponentsPage: EnderecoComponentsPage;
  let enderecoDeleteDialog: EnderecoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Enderecos', async () => {
    await navBarPage.getEntityPage('endereco');
    enderecoComponentsPage = new EnderecoComponentsPage();
    expect(await enderecoComponentsPage.getTitle().getText()).to.match(/Enderecos/);
  });

  it('should load create Endereco page', async () => {
    await enderecoComponentsPage.clickOnCreateButton();
    enderecoUpdatePage = new EnderecoUpdatePage();
    expect(await enderecoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.endereco.home.createOrEditLabel/);
    await enderecoUpdatePage.cancel();
  });

  it('should create and save Enderecos', async () => {
    async function createEndereco() {
      await enderecoComponentsPage.clickOnCreateButton();
      await enderecoUpdatePage.setRuaInput('rua');
      expect(await enderecoUpdatePage.getRuaInput()).to.match(/rua/);
      await enderecoUpdatePage.setBairroInput('bairro');
      expect(await enderecoUpdatePage.getBairroInput()).to.match(/bairro/);
      await enderecoUpdatePage.setComplementoInput('complemento');
      expect(await enderecoUpdatePage.getComplementoInput()).to.match(/complemento/);
      await enderecoUpdatePage.setNumeroInput('5');
      expect(await enderecoUpdatePage.getNumeroInput()).to.eq('5');
      await enderecoUpdatePage.setCidadeInput('cidade');
      expect(await enderecoUpdatePage.getCidadeInput()).to.match(/cidade/);
      await enderecoUpdatePage.setCepInput('cep');
      expect(await enderecoUpdatePage.getCepInput()).to.match(/cep/);
      await enderecoUpdatePage.estadoSelectLastOption();
      await waitUntilDisplayed(enderecoUpdatePage.getSaveButton());
      await enderecoUpdatePage.save();
      await waitUntilHidden(enderecoUpdatePage.getSaveButton());
      expect(await enderecoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEndereco();
    await enderecoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await enderecoComponentsPage.countDeleteButtons();
    await createEndereco();

    await enderecoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await enderecoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Endereco', async () => {
    await enderecoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await enderecoComponentsPage.countDeleteButtons();
    await enderecoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    enderecoDeleteDialog = new EnderecoDeleteDialog();
    expect(await enderecoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.endereco.delete.question/);
    await enderecoDeleteDialog.clickOnConfirmButton();

    await enderecoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await enderecoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
