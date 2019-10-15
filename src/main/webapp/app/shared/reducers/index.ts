import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import avaliacao, {
  AvaliacaoState
} from 'app/entities/avaliacao/avaliacao.reducer';
// prettier-ignore
import carrinho, {
  CarrinhoState
} from 'app/entities/carrinho/carrinho.reducer';
// prettier-ignore
import cliente, {
  ClienteState
} from 'app/entities/cliente/cliente.reducer';
// prettier-ignore
import endereco, {
  EnderecoState
} from 'app/entities/endereco/endereco.reducer';
// prettier-ignore
import foto, {
  FotoState
} from 'app/entities/foto/foto.reducer';
// prettier-ignore
import item, {
  ItemState
} from 'app/entities/item/item.reducer';
// prettier-ignore
import marca, {
  MarcaState
} from 'app/entities/marca/marca.reducer';
// prettier-ignore
import modoPagamento, {
  ModoPagamentoState
} from 'app/entities/modo-pagamento/modo-pagamento.reducer';
// prettier-ignore
import produto, {
  ProdutoState
} from 'app/entities/produto/produto.reducer';
// prettier-ignore
import veiculo, {
  VeiculoState
} from 'app/entities/veiculo/veiculo.reducer';
// prettier-ignore
import venda, {
  VendaState
} from 'app/entities/venda/venda.reducer';
// prettier-ignore
import vendedor, {
  VendedorState
} from 'app/entities/vendedor/vendedor.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly avaliacao: AvaliacaoState;
  readonly carrinho: CarrinhoState;
  readonly cliente: ClienteState;
  readonly endereco: EnderecoState;
  readonly foto: FotoState;
  readonly item: ItemState;
  readonly marca: MarcaState;
  readonly modoPagamento: ModoPagamentoState;
  readonly produto: ProdutoState;
  readonly veiculo: VeiculoState;
  readonly venda: VendaState;
  readonly vendedor: VendedorState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  avaliacao,
  carrinho,
  cliente,
  endereco,
  foto,
  item,
  marca,
  modoPagamento,
  produto,
  veiculo,
  venda,
  vendedor,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
