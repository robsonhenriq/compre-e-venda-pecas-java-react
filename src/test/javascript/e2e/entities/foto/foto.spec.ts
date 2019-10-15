/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FotoComponentsPage from './foto.page-object';
import { FotoDeleteDialog } from './foto.page-object';
import FotoUpdatePage from './foto-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Foto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fotoUpdatePage: FotoUpdatePage;
  let fotoComponentsPage: FotoComponentsPage;
  let fotoDeleteDialog: FotoDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load Fotos', async () => {
    await navBarPage.getEntityPage('foto');
    fotoComponentsPage = new FotoComponentsPage();
    expect(await fotoComponentsPage.getTitle().getText()).to.match(/Fotos/);
  });

  it('should load create Foto page', async () => {
    await fotoComponentsPage.clickOnCreateButton();
    fotoUpdatePage = new FotoUpdatePage();
    expect(await fotoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.foto.home.createOrEditLabel/);
    await fotoUpdatePage.cancel();
  });

  it('should create and save Fotos', async () => {
    async function createFoto() {
      await fotoComponentsPage.clickOnCreateButton();
      await fotoUpdatePage.setNomeInput('nome');
      expect(await fotoUpdatePage.getNomeInput()).to.match(/nome/);
      await fotoUpdatePage.setImagemInput(absolutePath);
      await waitUntilDisplayed(fotoUpdatePage.getSaveButton());
      await fotoUpdatePage.save();
      await waitUntilHidden(fotoUpdatePage.getSaveButton());
      expect(await fotoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFoto();
    await fotoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await fotoComponentsPage.countDeleteButtons();
    await createFoto();

    await fotoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await fotoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Foto', async () => {
    await fotoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await fotoComponentsPage.countDeleteButtons();
    await fotoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    fotoDeleteDialog = new FotoDeleteDialog();
    expect(await fotoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.foto.delete.question/);
    await fotoDeleteDialog.clickOnConfirmButton();

    await fotoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await fotoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
