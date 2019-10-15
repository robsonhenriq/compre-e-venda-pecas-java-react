/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VendaComponentsPage from './venda.page-object';
import { VendaDeleteDialog } from './venda.page-object';
import VendaUpdatePage from './venda-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Venda e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vendaUpdatePage: VendaUpdatePage;
  let vendaComponentsPage: VendaComponentsPage;
  let vendaDeleteDialog: VendaDeleteDialog;

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

  it('should load Vendas', async () => {
    await navBarPage.getEntityPage('venda');
    vendaComponentsPage = new VendaComponentsPage();
    expect(await vendaComponentsPage.getTitle().getText()).to.match(/Vendas/);
  });

  it('should load create Venda page', async () => {
    await vendaComponentsPage.clickOnCreateButton();
    vendaUpdatePage = new VendaUpdatePage();
    expect(await vendaUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.venda.home.createOrEditLabel/);
    await vendaUpdatePage.cancel();
  });

  it('should create and save Vendas', async () => {
    async function createVenda() {
      await vendaComponentsPage.clickOnCreateButton();
      await vendaUpdatePage.setDataHoraInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await vendaUpdatePage.getDataHoraInput()).to.contain('2001-01-01T02:30');
      await vendaUpdatePage.setTotalVendaInput('5');
      expect(await vendaUpdatePage.getTotalVendaInput()).to.eq('5');
      await vendaUpdatePage.compradorSelectLastOption();
      await vendaUpdatePage.enderecoEntregaSelectLastOption();
      await vendaUpdatePage.modoPagamentoSelectLastOption();
      // vendaUpdatePage.listVendedoresSelectLastOption();
      await waitUntilDisplayed(vendaUpdatePage.getSaveButton());
      await vendaUpdatePage.save();
      await waitUntilHidden(vendaUpdatePage.getSaveButton());
      expect(await vendaUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createVenda();
    await vendaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await vendaComponentsPage.countDeleteButtons();
    await createVenda();

    await vendaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await vendaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Venda', async () => {
    await vendaComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await vendaComponentsPage.countDeleteButtons();
    await vendaComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    vendaDeleteDialog = new VendaDeleteDialog();
    expect(await vendaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.venda.delete.question/);
    await vendaDeleteDialog.clickOnConfirmButton();

    await vendaComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await vendaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
