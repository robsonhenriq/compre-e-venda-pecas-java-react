/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ItemComponentsPage from './item.page-object';
import { ItemDeleteDialog } from './item.page-object';
import ItemUpdatePage from './item-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Item e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemUpdatePage: ItemUpdatePage;
  let itemComponentsPage: ItemComponentsPage;
  let itemDeleteDialog: ItemDeleteDialog;

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

  it('should load Items', async () => {
    await navBarPage.getEntityPage('item');
    itemComponentsPage = new ItemComponentsPage();
    expect(await itemComponentsPage.getTitle().getText()).to.match(/Items/);
  });

  it('should load create Item page', async () => {
    await itemComponentsPage.clickOnCreateButton();
    itemUpdatePage = new ItemUpdatePage();
    expect(await itemUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.item.home.createOrEditLabel/);
    await itemUpdatePage.cancel();
  });

  it('should create and save Items', async () => {
    async function createItem() {
      await itemComponentsPage.clickOnCreateButton();
      await itemUpdatePage.setValorTotalInput('5');
      expect(await itemUpdatePage.getValorTotalInput()).to.eq('5');
      await itemUpdatePage.setValorItemInput('5');
      expect(await itemUpdatePage.getValorItemInput()).to.eq('5');
      await itemUpdatePage.setQuantidadeInput('5');
      expect(await itemUpdatePage.getQuantidadeInput()).to.eq('5');
      await itemUpdatePage.produtoSelectLastOption();
      await itemUpdatePage.vendaSelectLastOption();
      await waitUntilDisplayed(itemUpdatePage.getSaveButton());
      await itemUpdatePage.save();
      await waitUntilHidden(itemUpdatePage.getSaveButton());
      expect(await itemUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createItem();
    await itemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await itemComponentsPage.countDeleteButtons();
    await createItem();

    await itemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Item', async () => {
    await itemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await itemComponentsPage.countDeleteButtons();
    await itemComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    itemDeleteDialog = new ItemDeleteDialog();
    expect(await itemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.item.delete.question/);
    await itemDeleteDialog.clickOnConfirmButton();

    await itemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await itemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
