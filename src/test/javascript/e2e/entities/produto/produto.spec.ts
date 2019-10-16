/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProdutoComponentsPage from './produto.page-object';
import { ProdutoDeleteDialog } from './produto.page-object';
import ProdutoUpdatePage from './produto-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Produto e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let produtoUpdatePage: ProdutoUpdatePage;
  let produtoComponentsPage: ProdutoComponentsPage;
  let produtoDeleteDialog: ProdutoDeleteDialog;

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

  it('should load Produtos', async () => {
    await navBarPage.getEntityPage('produto');
    produtoComponentsPage = new ProdutoComponentsPage();
    expect(await produtoComponentsPage.getTitle().getText()).to.match(/Produtos/);
  });

  it('should load create Produto page', async () => {
    await produtoComponentsPage.clickOnCreateButton();
    produtoUpdatePage = new ProdutoUpdatePage();
    expect(await produtoUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.produto.home.createOrEditLabel/);
    await produtoUpdatePage.cancel();
  });

  it('should create and save Produtos', async () => {
    async function createProduto() {
      await produtoComponentsPage.clickOnCreateButton();
      await produtoUpdatePage.setCodigoOriginalInput('codigoOriginal');
      expect(await produtoUpdatePage.getCodigoOriginalInput()).to.match(/codigoOriginal/);
      await produtoUpdatePage.setFabricanteInput('fabricante');
      expect(await produtoUpdatePage.getFabricanteInput()).to.match(/fabricante/);
      await produtoUpdatePage.setDescricaoInput('descricao');
      expect(await produtoUpdatePage.getDescricaoInput()).to.match(/descricao/);
      const selectedEhUsado = await produtoUpdatePage.getEhUsadoInput().isSelected();
      if (selectedEhUsado) {
        await produtoUpdatePage.getEhUsadoInput().click();
        expect(await produtoUpdatePage.getEhUsadoInput().isSelected()).to.be.false;
      } else {
        await produtoUpdatePage.getEhUsadoInput().click();
        expect(await produtoUpdatePage.getEhUsadoInput().isSelected()).to.be.true;
      }
      await produtoUpdatePage.setQuantidadeDisponivelInput('5');
      expect(await produtoUpdatePage.getQuantidadeDisponivelInput()).to.eq('5');
      await produtoUpdatePage.setAlturaInput('5');
      expect(await produtoUpdatePage.getAlturaInput()).to.eq('5');
      await produtoUpdatePage.setLarguraInput('5');
      expect(await produtoUpdatePage.getLarguraInput()).to.eq('5');
      await produtoUpdatePage.setPesoBrutoInput('5');
      expect(await produtoUpdatePage.getPesoBrutoInput()).to.eq('5');
      await produtoUpdatePage.setPrecoAVistaInput('5');
      expect(await produtoUpdatePage.getPrecoAVistaInput()).to.eq('5');
      await produtoUpdatePage.setPrecoAPrazoInput('5');
      expect(await produtoUpdatePage.getPrecoAPrazoInput()).to.eq('5');
      await produtoUpdatePage.categoriaSelectLastOption();
      await produtoUpdatePage.marcaSelectLastOption();
      // produtoUpdatePage.listFotosSelectLastOption();
      // produtoUpdatePage.aplicacoesSelectLastOption();
      // produtoUpdatePage.listAvaliacaoSelectLastOption();
      await waitUntilDisplayed(produtoUpdatePage.getSaveButton());
      await produtoUpdatePage.save();
      await waitUntilHidden(produtoUpdatePage.getSaveButton());
      expect(await produtoUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProduto();
    await produtoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await produtoComponentsPage.countDeleteButtons();
    await createProduto();

    await produtoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await produtoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Produto', async () => {
    await produtoComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await produtoComponentsPage.countDeleteButtons();
    await produtoComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    produtoDeleteDialog = new ProdutoDeleteDialog();
    expect(await produtoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.produto.delete.question/);
    await produtoDeleteDialog.clickOnConfirmButton();

    await produtoComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await produtoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
