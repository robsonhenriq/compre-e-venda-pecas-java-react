/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CarrinhoComponentsPage from './carrinho.page-object';
import { CarrinhoDeleteDialog } from './carrinho.page-object';
import CarrinhoUpdatePage from './carrinho-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Carrinho e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let carrinhoUpdatePage: CarrinhoUpdatePage;
  let carrinhoComponentsPage: CarrinhoComponentsPage;
  let carrinhoDeleteDialog: CarrinhoDeleteDialog;

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

  it('should load Carrinhos', async () => {
    await navBarPage.getEntityPage('carrinho');
    carrinhoComponentsPage = new CarrinhoComponentsPage();
    expect(await carrinhoComponentsPage.getTitle().getText()).to.match(/Carrinhos/);
  });

  it('should load create Carrinho page', async () => {
    await carrinhoComponentsPage.clickOnCreateButton();
    carrinhoUpdatePage = new CarrinhoUpdatePage();
    expect(await carrinhoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.carrinho.home.createOrEditLabel/);
    await carrinhoUpdatePage.cancel();
  });

  it('should create and save Carrinhos', async () => {
    async function createCarrinho() {
      await carrinhoComponentsPage.clickOnCreateButton();
      await carrinhoUpdatePage.setTotalCarrinhoInput('5');
      expect(await carrinhoUpdatePage.getTotalCarrinhoInput()).to.eq('5');
      // carrinhoUpdatePage.listItensSelectLastOption();
      await waitUntilDisplayed(carrinhoUpdatePage.getSaveButton());
      await carrinhoUpdatePage.save();
      await waitUntilHidden(carrinhoUpdatePage.getSaveButton());
      expect(await carrinhoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCarrinho();
    await carrinhoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await carrinhoComponentsPage.countDeleteButtons();
    await createCarrinho();

    await carrinhoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await carrinhoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Carrinho', async () => {
    await carrinhoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await carrinhoComponentsPage.countDeleteButtons();
    await carrinhoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    carrinhoDeleteDialog = new CarrinhoDeleteDialog();
    expect(await carrinhoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.carrinho.delete.question/);
    await carrinhoDeleteDialog.clickOnConfirmButton();

    await carrinhoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await carrinhoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
