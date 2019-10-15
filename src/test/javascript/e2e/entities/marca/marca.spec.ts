/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MarcaComponentsPage from './marca.page-object';
import { MarcaDeleteDialog } from './marca.page-object';
import MarcaUpdatePage from './marca-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Marca e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let marcaUpdatePage: MarcaUpdatePage;
  let marcaComponentsPage: MarcaComponentsPage;
  let marcaDeleteDialog: MarcaDeleteDialog;

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

  it('should load Marcas', async () => {
    await navBarPage.getEntityPage('marca');
    marcaComponentsPage = new MarcaComponentsPage();
    expect(await marcaComponentsPage.getTitle().getText()).to.match(/Marcas/);
  });

  it('should load create Marca page', async () => {
    await marcaComponentsPage.clickOnCreateButton();
    marcaUpdatePage = new MarcaUpdatePage();
    expect(await marcaUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.marca.home.createOrEditLabel/);
    await marcaUpdatePage.cancel();
  });

  it('should create and save Marcas', async () => {
    async function createMarca() {
      await marcaComponentsPage.clickOnCreateButton();
      await marcaUpdatePage.setNomeInput('nome');
      expect(await marcaUpdatePage.getNomeInput()).to.match(/nome/);
      await waitUntilDisplayed(marcaUpdatePage.getSaveButton());
      await marcaUpdatePage.save();
      await waitUntilHidden(marcaUpdatePage.getSaveButton());
      expect(await marcaUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createMarca();
    await marcaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await marcaComponentsPage.countDeleteButtons();
    await createMarca();

    await marcaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await marcaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Marca', async () => {
    await marcaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await marcaComponentsPage.countDeleteButtons();
    await marcaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    marcaDeleteDialog = new MarcaDeleteDialog();
    expect(await marcaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.marca.delete.question/);
    await marcaDeleteDialog.clickOnConfirmButton();

    await marcaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await marcaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
