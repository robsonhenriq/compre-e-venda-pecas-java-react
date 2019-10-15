/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VeiculoComponentsPage from './veiculo.page-object';
import { VeiculoDeleteDialog } from './veiculo.page-object';
import VeiculoUpdatePage from './veiculo-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Veiculo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let veiculoUpdatePage: VeiculoUpdatePage;
  let veiculoComponentsPage: VeiculoComponentsPage;
  let veiculoDeleteDialog: VeiculoDeleteDialog;

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

  it('should load Veiculos', async () => {
    await navBarPage.getEntityPage('veiculo');
    veiculoComponentsPage = new VeiculoComponentsPage();
    expect(await veiculoComponentsPage.getTitle().getText()).to.match(/Veiculos/);
  });

  it('should load create Veiculo page', async () => {
    await veiculoComponentsPage.clickOnCreateButton();
    veiculoUpdatePage = new VeiculoUpdatePage();
    expect(await veiculoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.veiculo.home.createOrEditLabel/);
    await veiculoUpdatePage.cancel();
  });

  it('should create and save Veiculos', async () => {
    async function createVeiculo() {
      await veiculoComponentsPage.clickOnCreateButton();
      await veiculoUpdatePage.setNomeInput('nome');
      expect(await veiculoUpdatePage.getNomeInput()).to.match(/nome/);
      await veiculoUpdatePage.setAnoInput('01-01-2001');
      expect(await veiculoUpdatePage.getAnoInput()).to.eq('2001-01-01');
      await veiculoUpdatePage.marcaSelectLastOption();
      await waitUntilDisplayed(veiculoUpdatePage.getSaveButton());
      await veiculoUpdatePage.save();
      await waitUntilHidden(veiculoUpdatePage.getSaveButton());
      expect(await veiculoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createVeiculo();
    await veiculoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await veiculoComponentsPage.countDeleteButtons();
    await createVeiculo();

    await veiculoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await veiculoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Veiculo', async () => {
    await veiculoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await veiculoComponentsPage.countDeleteButtons();
    await veiculoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    veiculoDeleteDialog = new VeiculoDeleteDialog();
    expect(await veiculoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.veiculo.delete.question/);
    await veiculoDeleteDialog.clickOnConfirmButton();

    await veiculoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await veiculoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
