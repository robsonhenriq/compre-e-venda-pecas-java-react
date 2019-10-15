/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VendedorComponentsPage from './vendedor.page-object';
import { VendedorDeleteDialog } from './vendedor.page-object';
import VendedorUpdatePage from './vendedor-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Vendedor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vendedorUpdatePage: VendedorUpdatePage;
  let vendedorComponentsPage: VendedorComponentsPage;
  let vendedorDeleteDialog: VendedorDeleteDialog;

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

  it('should load Vendedors', async () => {
    await navBarPage.getEntityPage('vendedor');
    vendedorComponentsPage = new VendedorComponentsPage();
    expect(await vendedorComponentsPage.getTitle().getText()).to.match(/Vendedors/);
  });

  it('should load create Vendedor page', async () => {
    await vendedorComponentsPage.clickOnCreateButton();
    vendedorUpdatePage = new VendedorUpdatePage();
    expect(await vendedorUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.vendedor.home.createOrEditLabel/);
    await vendedorUpdatePage.cancel();
  });

  it('should create and save Vendedors', async () => {
    async function createVendedor() {
      await vendedorComponentsPage.clickOnCreateButton();
      const selectedEhEmpresa = await vendedorUpdatePage.getEhEmpresaInput().isSelected();
      if (selectedEhEmpresa) {
        await vendedorUpdatePage.getEhEmpresaInput().click();
        expect(await vendedorUpdatePage.getEhEmpresaInput().isSelected()).to.be.false;
      } else {
        await vendedorUpdatePage.getEhEmpresaInput().click();
        expect(await vendedorUpdatePage.getEhEmpresaInput().isSelected()).to.be.true;
      }
      await vendedorUpdatePage.setRazaoSocialInput('razaoSocial');
      expect(await vendedorUpdatePage.getRazaoSocialInput()).to.match(/razaoSocial/);
      await vendedorUpdatePage.setCnpjInput('cnpj');
      expect(await vendedorUpdatePage.getCnpjInput()).to.match(/cnpj/);
      await vendedorUpdatePage.setCpfInput('cpf');
      expect(await vendedorUpdatePage.getCpfInput()).to.match(/cpf/);
      await vendedorUpdatePage.setDataCadastroInput('01-01-2001');
      expect(await vendedorUpdatePage.getDataCadastroInput()).to.eq('2001-01-01');
      await vendedorUpdatePage.setDataNascimentoInput('01-01-2001');
      expect(await vendedorUpdatePage.getDataNascimentoInput()).to.eq('2001-01-01');
      await vendedorUpdatePage.setDescricaoInput('descricao');
      expect(await vendedorUpdatePage.getDescricaoInput()).to.match(/descricao/);
      await vendedorUpdatePage.usuarioSelectLastOption();
      await vendedorUpdatePage.enderecoSelectLastOption();
      // vendedorUpdatePage.listProdutosSelectLastOption();
      await waitUntilDisplayed(vendedorUpdatePage.getSaveButton());
      await vendedorUpdatePage.save();
      await waitUntilHidden(vendedorUpdatePage.getSaveButton());
      expect(await vendedorUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createVendedor();
    await vendedorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await vendedorComponentsPage.countDeleteButtons();
    await createVendedor();

    await vendedorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await vendedorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Vendedor', async () => {
    await vendedorComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await vendedorComponentsPage.countDeleteButtons();
    await vendedorComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    vendedorDeleteDialog = new VendedorDeleteDialog();
    expect(await vendedorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.vendedor.delete.question/);
    await vendedorDeleteDialog.clickOnConfirmButton();

    await vendedorComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await vendedorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
