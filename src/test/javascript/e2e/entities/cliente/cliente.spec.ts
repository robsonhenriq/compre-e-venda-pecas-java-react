/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ClienteComponentsPage from './cliente.page-object';
import { ClienteDeleteDialog } from './cliente.page-object';
import ClienteUpdatePage from './cliente-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteDeleteDialog: ClienteDeleteDialog;

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

  it('should load Clientes', async () => {
    await navBarPage.getEntityPage('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    expect(await clienteComponentsPage.getTitle().getText()).to.match(/Clientes/);
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.clickOnCreateButton();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle().getAttribute('id')).to.match(/ecommerceApp.cliente.home.createOrEditLabel/);
    await clienteUpdatePage.cancel();
  });

  it('should create and save Clientes', async () => {
    async function createCliente() {
      await clienteComponentsPage.clickOnCreateButton();
      await clienteUpdatePage.setNomeInput('nome');
      expect(await clienteUpdatePage.getNomeInput()).to.match(/nome/);
      await clienteUpdatePage.setCpfInput('cpf');
      expect(await clienteUpdatePage.getCpfInput()).to.match(/cpf/);
      await clienteUpdatePage.setRgInput('rg');
      expect(await clienteUpdatePage.getRgInput()).to.match(/rg/);
      await clienteUpdatePage.setDataNascimentoInput('01-01-2001');
      expect(await clienteUpdatePage.getDataNascimentoInput()).to.eq('2001-01-01');
      await clienteUpdatePage.setTelefoneInput('telefone');
      expect(await clienteUpdatePage.getTelefoneInput()).to.match(/telefone/);
      await clienteUpdatePage.setCelularInput('celular');
      expect(await clienteUpdatePage.getCelularInput()).to.match(/celular/);
      await clienteUpdatePage.carrinhoSelectLastOption();
      await clienteUpdatePage.usuarioSelectLastOption();
      // clienteUpdatePage.listVeiculosSelectLastOption();
      // clienteUpdatePage.listEnderecoSelectLastOption();
      await waitUntilDisplayed(clienteUpdatePage.getSaveButton());
      await clienteUpdatePage.save();
      await waitUntilHidden(clienteUpdatePage.getSaveButton());
      expect(await clienteUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCliente();
    await clienteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();
    await createCliente();

    await clienteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Cliente', async () => {
    await clienteComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
    await clienteComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    clienteDeleteDialog = new ClienteDeleteDialog();
    expect(await clienteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/ecommerceApp.cliente.delete.question/);
    await clienteDeleteDialog.clickOnConfirmButton();

    await clienteComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
