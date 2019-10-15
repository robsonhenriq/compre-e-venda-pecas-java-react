/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AvaliacaoComponentsPage from './avaliacao.page-object';
import { AvaliacaoDeleteDialog } from './avaliacao.page-object';
import AvaliacaoUpdatePage from './avaliacao-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Avaliacao e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let avaliacaoUpdatePage: AvaliacaoUpdatePage;
  let avaliacaoComponentsPage: AvaliacaoComponentsPage;
  let avaliacaoDeleteDialog: AvaliacaoDeleteDialog;

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

  it('should load Avaliacaos', async () => {
    await navBarPage.getEntityPage('avaliacao');
    avaliacaoComponentsPage = new AvaliacaoComponentsPage();
    expect(await avaliacaoComponentsPage.getTitle().getText()).to.match(/Avaliacaos/);
  });

  it('should load create Avaliacao page', async () => {
    await avaliacaoComponentsPage.clickOnCreateButton();
    avaliacaoUpdatePage = new AvaliacaoUpdatePage();
    expect(await avaliacaoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.avaliacao.home.createOrEditLabel/);
    await avaliacaoUpdatePage.cancel();
  });

  it('should create and save Avaliacaos', async () => {
    async function createAvaliacao() {
      await avaliacaoComponentsPage.clickOnCreateButton();
      await avaliacaoUpdatePage.setDataHoraInput('01-01-2001');
      expect(await avaliacaoUpdatePage.getDataHoraInput()).to.eq('2001-01-01');
      await avaliacaoUpdatePage.setDescricaoInput('descricao');
      expect(await avaliacaoUpdatePage.getDescricaoInput()).to.match(/descricao/);
      // avaliacaoUpdatePage.listClienteSelectLastOption();
      await waitUntilDisplayed(avaliacaoUpdatePage.getSaveButton());
      await avaliacaoUpdatePage.save();
      await waitUntilHidden(avaliacaoUpdatePage.getSaveButton());
      expect(await avaliacaoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAvaliacao();
    await avaliacaoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await avaliacaoComponentsPage.countDeleteButtons();
    await createAvaliacao();

    await avaliacaoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await avaliacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Avaliacao', async () => {
    await avaliacaoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await avaliacaoComponentsPage.countDeleteButtons();
    await avaliacaoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    avaliacaoDeleteDialog = new AvaliacaoDeleteDialog();
    expect(await avaliacaoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.avaliacao.delete.question/);
    await avaliacaoDeleteDialog.clickOnConfirmButton();

    await avaliacaoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await avaliacaoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
