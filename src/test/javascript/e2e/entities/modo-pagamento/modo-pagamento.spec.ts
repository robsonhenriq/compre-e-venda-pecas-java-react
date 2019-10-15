/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ModoPagamentoComponentsPage from './modo-pagamento.page-object';
import { ModoPagamentoDeleteDialog } from './modo-pagamento.page-object';
import ModoPagamentoUpdatePage from './modo-pagamento-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ModoPagamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let modoPagamentoUpdatePage: ModoPagamentoUpdatePage;
  let modoPagamentoComponentsPage: ModoPagamentoComponentsPage;
  let modoPagamentoDeleteDialog: ModoPagamentoDeleteDialog;

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

  it('should load ModoPagamentos', async () => {
    await navBarPage.getEntityPage('modo-pagamento');
    modoPagamentoComponentsPage = new ModoPagamentoComponentsPage();
    expect(await modoPagamentoComponentsPage.getTitle().getText()).to.match(/Modo Pagamentos/);
  });

  it('should load create ModoPagamento page', async () => {
    await modoPagamentoComponentsPage.clickOnCreateButton();
    modoPagamentoUpdatePage = new ModoPagamentoUpdatePage();
    expect(await modoPagamentoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.modoPagamento.home.createOrEditLabel/);
    await modoPagamentoUpdatePage.cancel();
  });

  it('should create and save ModoPagamentos', async () => {
    async function createModoPagamento() {
      await modoPagamentoComponentsPage.clickOnCreateButton();
      await modoPagamentoUpdatePage.setDescricaoInput('descricao');
      expect(await modoPagamentoUpdatePage.getDescricaoInput()).to.match(/descricao/);
      await modoPagamentoUpdatePage.tipoPagamentoSelectLastOption();
      await waitUntilDisplayed(modoPagamentoUpdatePage.getSaveButton());
      await modoPagamentoUpdatePage.save();
      await waitUntilHidden(modoPagamentoUpdatePage.getSaveButton());
      expect(await modoPagamentoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createModoPagamento();
    await modoPagamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await modoPagamentoComponentsPage.countDeleteButtons();
    await createModoPagamento();

    await modoPagamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await modoPagamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ModoPagamento', async () => {
    await modoPagamentoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await modoPagamentoComponentsPage.countDeleteButtons();
    await modoPagamentoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    modoPagamentoDeleteDialog = new ModoPagamentoDeleteDialog();
    expect(await modoPagamentoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.modoPagamento.delete.question/);
    await modoPagamentoDeleteDialog.clickOnConfirmButton();

    await modoPagamentoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await modoPagamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
